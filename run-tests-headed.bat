@echo off
setlocal EnableExtensions

REM Run Playwright tests in headed mode from the repository root.
cd /d "%~dp0"
set "SITE_TARGET=local"
if not defined SLOWMO set "SLOWMO=0"
if not defined WORKERS set "WORKERS=5"

echo Running Playwright tests in headed mode with SITE_TARGET=%SITE_TARGET% (SLOWMO=%SLOWMO%ms, WORKERS=%WORKERS%)...
call npx playwright test  --workers=%WORKERS%  %* 
REM --project=chromium -g "CV download link"  --headed
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