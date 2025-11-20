from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ComplianceRequestCreate(BaseModel):
    companyName: str = Field(..., min_length=1, max_length=200)
    contactPerson: str = Field(..., min_length=1, max_length=200)
    phone: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    usdotMc: Optional[str] = Field(None, max_length=100)
    serviceNeeded: Optional[str] = Field(None, max_length=100)
    message: Optional[str] = Field(None, max_length=2000)

class ComplianceRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    companyName: str
    contactPerson: str
    phone: str
    email: str
    usdotMc: Optional[str] = None
    message: Optional[str] = None
    submittedAt: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ComplianceRequestResponse(BaseModel):
    success: bool
    message: str
    requestId: Optional[str] = None
