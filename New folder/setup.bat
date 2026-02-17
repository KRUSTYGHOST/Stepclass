@echo off
echo MediConnect Setup Script
echo ==========================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python 3.11+
    exit /b 1
)

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js 18+
    exit /b 1
)

echo Python and Node.js found
echo.

REM Backend setup
echo Setting up backend...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -r requirements.txt
if not exist .env (
    copy .env.example .env
    echo Please edit backend\.env with your API keys
)
cd ..

REM Frontend setup
echo Setting up frontend...
cd frontend
if not exist node_modules (
    call npm install
)
cd ..

echo.
echo Setup complete!
echo.
echo To start the application:
echo   Backend:  cd backend ^&^& venv\Scripts\activate ^&^& python run.py
echo   Frontend: cd frontend ^&^& npm run dev
echo.
echo Or use Docker: docker-compose up --build
