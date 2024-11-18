# CRUD App with FastAPI, Tailwind CSS, and ReactJS

This project is a CRUD (Create, Read, Update, Delete) application built using FastAPI for the backend, Tailwind CSS for styling, and ReactJS for the frontend.

## Table of Contents

- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Docker Setup](#docker-setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/siddarthgajjar/fastapi-react-tailwind-app.git
    cd fastapi-react-tailwind-app/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

### Docker Setup

To run the application using Docker, follow these steps:

1. Make sure Docker is installed and running on your machine.

2. Navigate to the root of your project directory.

3. Build and start the containers using Docker Compose:
    ```bash
    docker-compose up --build
    ```

This will build the Docker images for both the backend and frontend, and start the containers. You can access your application at `http://localhost:3000`.

## Usage

Once both the backend and frontend servers are running, you can access the application in your web browser at `http://localhost:3000`.

## Folder Structure

```plaintext
├── README.md
├── backend
│   ├── __pycache__
│   ├── alembic.ini
│   ├── auth.py
│   ├── database.db
│   ├── database.py
│   ├── main.py
│   ├── migrations
│   │   ├── README
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   │       ├── 4996a6b8f2b2_remove_phonefield.py
│   │       ├── 54c04ebc2d43_added_phonefield.py
│   │       ├── 87dd9f08e15d_remove_is_admin_field.py
│   ├── models
│   │   ├── __init__.py
│   │   ├── driver_license_application.py
│   │   └── user.py
│   ├── requirements.txt
│   ├── routers
│   │   ├── __init__.py
│   │   ├── auth_routes.py
│   │   ├── driver_license.py
│   │   └── user.py
│   └── security.py
├── frontend
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.js
│   │   ├── api
│   │   │   ├── applicationApi.js
│   │   │   └── authApi.js
│   │   ├── components
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── features
│   │   │   └── auth
│   │   │       ├── LoginForm.js
│   │   │       └── RegisterForm.js
│   │   ├── hooks
│   │   │   └── useAuth.js
│   │   ├── index.js
│   │   ├── layouts
│   │   │   └── MainLayout.js
│   │   ├── pages
│   │   │   ├── CreateApplicationForm.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── EditApplicationPage.js
│   │   │   ├── LoginPage.js
│   │   │   └── RegisterPage.js
│   │   ├── routes.js
│   │   ├── services
│   │   │   └── httpService.js
│   │   └── styles
│   │       ├── App.css
│   │       └── index.css
│   └── tailwind.config.js
└── requirements.txt
