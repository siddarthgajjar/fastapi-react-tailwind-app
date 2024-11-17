import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import driver_license_application, user
from database import init_db, get_session

from routers import driver_license, user, auth_routes

app = FastAPI()

origins= [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/api/users", tags=["Users"])
app.include_router(driver_license.router, prefix="/api/driver_license", tags=["Applications"])
app.include_router(auth_routes.router, prefix="/api", tags=["Auth"])


@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def root():
    return {"message": "Hello World"}


# if __name__ == '__main__':
#     uvicorn.run(app,host="127.0.0.1", port=8000)

# uvicorn main:app --reload

# alembic init migrations
# alembic revision --autogenerate -m "Add phone_number field to DriverLicenseApplication"
# alembic upgrade head
