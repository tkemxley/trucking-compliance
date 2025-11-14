from fastapi import APIRouter, HTTPException, status
from models import ComplianceRequestCreate, ComplianceRequest, ComplianceRequestResponse
from email_service import email_service
import logging
from motor.motor_asyncio import AsyncIOMotorDatabase

logger = logging.getLogger(__name__)

router = APIRouter()

async def create_compliance_request(request: ComplianceRequestCreate, db: AsyncIOMotorDatabase):
    """
    Handle compliance request submission:
    1. Save to MongoDB
    2. Send email notification
    3. Return response
    """
    try:
        # Create compliance request object
        compliance_request = ComplianceRequest(
            companyName=request.companyName,
            contactPerson=request.contactPerson,
            phone=request.phone,
            email=request.email,
            usdotMc=request.usdotMc,
            message=request.message
        )
        
        # Save to MongoDB
        request_dict = compliance_request.dict()
        result = await db.compliance_requests.insert_one(request_dict)
        
        logger.info(f"Compliance request saved: {compliance_request.id}")
        
        # Send email notification (async, non-blocking)
        email_sent = await email_service.send_compliance_request_notification(request_dict)
        
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
