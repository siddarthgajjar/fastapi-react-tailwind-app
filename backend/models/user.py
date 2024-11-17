from sqlmodel import Field, SQLModel
from pydantic import EmailStr, validator


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    password: str
    email: EmailStr = Field(unique=True, index=True, max_length=255)

class UserCreate(SQLModel):
    email: EmailStr
    password: str =  Field(min_length=8, max_length=128)

    @validator("password")
    def validate_password(cls, value):
        # Password validation (at least one uppercase, one lowercase, one number)
        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one digit.")
        if not any(char.islower() for char in value):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter.")
        return value


class UserRead(SQLModel):
    id: int
    username: str
    email: EmailStr
