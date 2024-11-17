from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, Session
from models.driver_license_application import (
    DriverLicenseApplication,
    DriverLicenseApplicationCreate,
    DriverLicenseApplicationRead,
    DriverLicenseApplicationUpdate,
)
from database import get_session
from auth import verify_token
from typing import List
from models.user import User

router = APIRouter()


# Create a new driver license application
@router.post("/", response_model=DriverLicenseApplicationRead, status_code=status.HTTP_201_CREATED)
def create_application(
    application: DriverLicenseApplicationCreate,
    session: Session = Depends(get_session),
    user: User = Depends(verify_token),
):
    try:
        new_application = DriverLicenseApplication(**application.dict(), user_id=user.id)
        session.add(new_application)
        session.commit()
        session.refresh(new_application)
        return new_application
    except ValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=e.errors()
        )

# Get all applications of the current user
@router.get("/my", response_model=List[DriverLicenseApplicationRead])
def read_user_applications(
    user: User = Depends(verify_token),
    session: Session = Depends(get_session),
):
    applications = session.exec(
        select(DriverLicenseApplication).where(DriverLicenseApplication.user_id == user.id)
    ).all()
    return applications

# Get a specific application by ID
@router.get("/{application_id}", response_model=DriverLicenseApplicationRead)
def read_application(
    application_id: int,
    user: User = Depends(verify_token),
    session: Session = Depends(get_session),
):
    application = session.get(DriverLicenseApplication, application_id)
    if not application or application.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found.")
    return application

# Update an application (status or other fields)
@router.put("/{application_id}", response_model=DriverLicenseApplicationRead)
def update_application(
    application_id: int,
    update_data: DriverLicenseApplicationUpdate,
    user: User = Depends(verify_token),
    session: Session = Depends(get_session),
):
    application = session.get(DriverLicenseApplication, application_id)
    if not application or application.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found.")

    # Update only the fields provided
    update_dict = update_data.dict(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(application, key, value)

    session.add(application)
    session.commit()
    session.refresh(application)
    return application

# Delete an application
@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    application_id: int,
    user: User = Depends(verify_token),
    session: Session = Depends(get_session),
):
    application = session.get(DriverLicenseApplication, application_id)
    if not application or application.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found.")

    session.delete(application)
    session.commit()
    return {"detail": "Application deleted successfully"}

