@echo off
rem Makes Windows run the outreach cycle by itself every hour on weekdays, 9am to 5pm.
rem It reads replies, writes follow-ups, and sends emails YOU already approved, within your daily limit.
rem Double-click this file once. To remove it later, run remove-daily-task.bat.
cd /d "%~dp0"
if not exist node_modules (
  echo Installing, one time only...
  call npm install
)
set "NODE=node"
for /f "delims=" %%i in ('where node') do set "NODE=%%i"
schtasks /Create /F /TN "OryanOutreachDaily" /SC HOURLY /MO 1 /ST 09:00 /ET 17:00 /TR "\"%NODE%\" --disable-warning=ExperimentalWarning \"%~dp0src\daily.js\""
if %errorlevel%==0 (
  echo.
  echo Done. The outreach cycle will now run every hour from 9am to 5pm.
  echo Log file: %~dp0data\daily.log
) else (
  echo.
  echo Could not create the task. Right-click this file and choose "Run as administrator", then try again.
)
pause
