@echo off
echo.
echo  ================================================
echo   SNN — Suryansh News Network
echo   Starting broadcast...
echo  ================================================
echo.
echo  [1/2] Starting SNN broadcast server on :5000...
start "SNN Server" cmd /k "cd /d %~dp0server && npm install && node index.js"
timeout /t 4 /nobreak > nul
echo  [2/2] Starting newsroom frontend on :3000...
start "SNN Frontend" cmd /k "cd /d %~dp0client && npm install --legacy-peer-deps && npm start"
echo.
echo  Newsroom  -^> http://localhost:3000
echo  Backend   -^> http://localhost:5000
echo  Stocks    -^> http://localhost:5000/api/stocks
echo  Metrics   -^> http://localhost:5000/api/metrics
echo.
pause
