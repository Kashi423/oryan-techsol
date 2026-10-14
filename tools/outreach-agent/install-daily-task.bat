@echo off
rem Makes Windows run the outreach cycle by itself every 30 minutes, all day.
rem The app decides WHEN sending is allowed (Tue-Thu 8-11am in each recipient's own time zone),
rem so this only has to wake up often enough to catch that window wherever you are.
rem Each run: reads replies, writes follow-ups, and sends emails YOU already approved,
rem within your daily limits. It never finds or approves anything new on its own.
rem Double-click this file once. To remove it later, run remove-daily-task.bat.
cd /d "%~dp0"
if not exist node_modules (
  echo Installing, one time only...
  call npm install
)
set "NODE=node"
for /f "delims=" %%i in ('where node') do set "NODE=%%i"
schtasks /Create /F /TN "OryanOutreachDaily" /SC MINUTE /MO 30 /TR "\"%NODE%\" --disable-warning=ExperimentalWarning \"%~dp0src\daily.js\""
if %errorlevel%==0 (
  echo.
  echo Done. The outreach cycle now runs every 30 minutes while this PC is on and you are signed in.
  echo Log file: %~dp0data\daily.log
  echo.
  echo Keep the PC plugged in and set to never sleep while emails are scheduled, because a sleeping PC runs nothing.
) else (
  echo.
  echo Could not create the task. Right-click this file and choose "Run as administrator", then try again.
)
pause
