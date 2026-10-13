@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing, one time only...
  call npm install
)
set OUTREACH_DEMO=1
node --disable-warning=ExperimentalWarning src\start.js
pause
