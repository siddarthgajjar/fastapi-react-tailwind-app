from sqlmodel import SQLModel, Field
from typing import Optional



class DriverLicenseApplication(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    last_name: str
    first_name: str
    middle_name: Optional[str] = None
    driver_license_number: Optional[str] = None
    birth_date: str
    sex: str
    height: float

    # Address fields
    unit_number: Optional[str] = None
    street_number: str
    street_name: str
    po_box: Optional[str] = None
    city: str
    province: str
    postal_code: str

    status: str = Field(default="in_progress")
    user_id: int = Field(foreign_key="user.id")

class DriverLicenseApplicationCreate(SQLModel):
    # Basic information
    last_name: str = Field(min_length=1, max_length=50)
    first_name: str = Field(min_length=1, max_length=50)
    middle_name: Optional[str] = Field(None, max_length=50)
    driver_license_number: Optional[str] = Field(None, max_length=15)
    birth_date: str = Field(regex=r"^\d{2}/\d{2}/\d{4}$")  # Format: dd/mm/yyyy
    sex: str = Field(regex=r"^[MFX]$")  # M (Male), F (Female), X (Non-binary)
    height: float  # Height in centimeters

    # Address fields
    unit_number: Optional[str] = Field(None, max_length=10)
    street_number: str = Field(min_length=1, max_length=10)
    street_name: str = Field(min_length=1, max_length=100)
    po_box: Optional[str] = Field(None, max_length=10)
    city: str = Field(min_length=1, max_length=100)
    province: str = Field(min_length=1, max_length=50)
    postal_code: str = Field()  # Canadian postal code format
    status: str

class DriverLicenseApplicationRead(SQLModel):
    # Basic information
    id: int
    last_name: str = Field(min_length=1, max_length=50)
    first_name: str = Field(min_length=1, max_length=50)
    middle_name: Optional[str] = Field(None, max_length=50)
    driver_license_number: Optional[str] = Field(None, max_length=15)
    birth_date: str = Field()  # Format: dd/mm/yyyy
    sex: str = Field()  # M (Male), F (Female), X (Non-binary)
    height: float  # Height in centimeters

    # Address fields
    unit_number: Optional[str] = Field(None, max_length=10)
    street_number: str = Field(min_length=1, max_length=10)
    street_name: str = Field(min_length=1, max_length=100)
    po_box: Optional[str] = Field(None, max_length=10)
    city: str = Field(min_length=1, max_length=100)
    province: str = Field(min_length=1, max_length=50)
    postal_code: str = Field()  # Canadian postal code format
    status: str

class DriverLicenseApplicationUpdate(DriverLicenseApplicationCreate):
    status: Optional[str] = None
