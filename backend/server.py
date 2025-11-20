from fastapi import FastAPI, APIRouter, HTTPException, status, File, UploadFile, Form
from typing import Optional
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from models import ComplianceRequestCreate, ComplianceRequest, ComplianceRequestResponse
from email_service import email_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Compliance Request Endpoint with File Upload
@api_router.post("/compliance-request", response_model=ComplianceRequestResponse)
async def submit_compliance_request(
    companyName: str = Form(...),
    contactPerson: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    serviceNeeded: str = Form(...),
    usdotMc: Optional[str] = Form(None),
    message: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    """
    Handle compliance request submission with optional file upload:
    1. Save file if provided
    2. Save to MongoDB
    3. Send email notification
    4. Return response
    """
    try:
        file_info = None
        if file:
            # Save uploaded file
            file_location = f"/app/uploads/{file.filename}"
            os.makedirs("/app/uploads", exist_ok=True)
            with open(file_location, "wb+") as file_object:
                file_object.write(await file.read())
            file_info = file.filename
            logger.info(f"File uploaded: {file.filename}")
        
        # Create compliance request object
        compliance_request = ComplianceRequest(
            companyName=companyName,
            contactPerson=contactPerson,
            phone=phone,
            email=email,
            usdotMc=usdotMc,
            serviceNeeded=serviceNeeded,
            message=message
        )
        
        # Save to MongoDB
        request_dict = compliance_request.model_dump()
        request_dict['submittedAt'] = request_dict['submittedAt'].isoformat()
        
        await db.compliance_requests.insert_one(request_dict)
        
        logger.info(f"Compliance request saved: {compliance_request.id}")
        
        # Send email notification (async, non-blocking)
        email_data = compliance_request.model_dump()
        email_sent = await email_service.send_compliance_request_notification(email_data)
        
        if email_sent:
            logger.info("Email notification sent successfully")
        else:
            logger.warning("Email notification failed, but request was saved")
        
        # Return success response
        return ComplianceRequestResponse(
            success=True,
            message="Thank you! We will contact you shortly.",
            requestId=compliance_request.id
        )
        
    except Exception as e:
        logger.error(f"Error creating compliance request: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error. Please try again."
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()