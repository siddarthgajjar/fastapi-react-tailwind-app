from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from models.user import User, UserCreate, UserRead
from database import get_session
from typing import List
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create a new user
@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user: User, session: Session = Depends(get_session)):
    # Check if the email already exists
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    # Hash the password and create the user
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, email=user.email, password=hashed_password)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

# Get all users (admin only)
@router.get("/", response_model=List[UserRead])
def read_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users

# Get a single user by ID
@router.get("/{user_id}", response_model=UserRead)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

# Update user information
@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, user_update: User, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Update user details
    user.username = user_update.username
    user.email = user_update.email
    user.password = pwd_context.hash(user_update.password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

# Delete a user
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    session.delete(user)
    session.commit()
    return {"message": "User deleted successfully"}
