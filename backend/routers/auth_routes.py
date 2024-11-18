from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, Session
from models.user import User, UserCreate, UserRead
from database import get_session
from auth import create_access_token, verify_token
from pydantic import BaseModel
from passlib.context import CryptContext
from security import verify_password
from sqlalchemy.exc import IntegrityError


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()


class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, session: Session = Depends(get_session)):
    try:
        hashed_password = pwd_context.hash(user.password)
        new_user = User(
            username=user.username,  # Default username from email
            password=hashed_password,
            email=user.email
        )
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        return {"message": "User registered successfully."}
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists."
        )
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}"
        )

@router.post("/token")
def login(user: UserLogin, session: Session = Depends(get_session)):
    try:
        # Database query for the user
        try:
            db_user = session.exec(select(User).where(User.username == user.username)).first()
        except Exception as db_error:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="A database error occurred. Please try again later."
            )

        # User not found
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="The username does not exist. Please check your input."
            )

        # Incorrect password
        if not verify_password(user.password, db_user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password. Please try again."
            )

        # Generate access token
        token = create_access_token(data={"sub": str(db_user.id)})
        return {"access_token": token, "token_type": "bearer"}

    except HTTPException as http_exc:
        # Return user-friendly error message
        raise http_exc

    except Exception as e:
        # Log the exception for debugging (optional) and return a general error message
        print(f"Unexpected error during login: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Please try again later."
        )

