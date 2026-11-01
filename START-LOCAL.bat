@echo off
cd /d "%~dp0"
where py >nul 2>nul
if errorlevel 1 (
  echo Install Python 3, then run this file again.
  pause
  exit /b 1
)
start "" "http://localhost:8000/owner.html"
py -m http.server 8000
pause
