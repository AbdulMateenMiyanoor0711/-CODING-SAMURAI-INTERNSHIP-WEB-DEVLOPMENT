@echo off
echo ========================================
echo E-Commerce MERN App - Quick Start
echo ========================================
echo.

echo Checking if MongoDB is running...
echo Please ensure MongoDB is running before proceeding.
echo.
echo If using local MongoDB, run: net start MongoDB
echo If using MongoDB Atlas, ensure your connection string is in server/.env
echo.
pause

echo.
echo Starting the application...
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:5000
echo.

start cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak >nul
start cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo Press any key to exit this window.
pause >nul
