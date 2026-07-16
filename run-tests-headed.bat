@echo off
setlocal EnableExtensions

REM Run Playwright tests in headed mode from the repository root.
cd /d "%~dp0"
set "SITE_TARGET=local"

echo Running Playwright tests in headed mode with SITE_TARGET=%SITE_TARGET%...
call npx playwright test --headed %* --project=chromium
if errorlevel 1 exit /b 1

echo.
echo All tests passed!
set /p "PUSH_CONFIRM=Do you want to push? Press Enter to exit or type yes to proceed: "
if errorlevel 1 (
    echo.
    echo No input received - skipping push.
    exit /b 0
)

if /I "%PUSH_CONFIRM%"=="y" goto :push
if /I "%PUSH_CONFIRM%"=="yes" goto :push
exit /b 0

:push
echo.
echo Staging and pushing changes...
git add -A
git commit -m "chore: automated commit after passing tests"
if errorlevel 1 (
    echo Commit failed or there were no changes to commit.
    exit /b 1
)

git push
if errorlevel 1 exit /b 1
exit /b 0