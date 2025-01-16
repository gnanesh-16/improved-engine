@echo off
:: Check if node_modules directory exists
if exist "node_modules" (
    echo node_modules already exists. Skipping npm i...
) else (
    echo Installing dependencies...
    npm i

    if %errorlevel% neq 0 (
        echo Installation failed, exiting...
        pause
        exit /b %errorlevel%
    )
)

echo.
echo Installation complete, starting Electron application...

:: Run the Electron application in the same terminal window
npm run dev:electron

:: Close the terminal window after execution completes
exit
