@echo off
REM Run Playwright tests in headed mode from the repository root.
cd /d "%~dp0"
set "SITE_TARGET=local"
echo Running Playwright tests in headed mode with SITE_TARGET=%SITE_TARGET%...
npx playwright test --project=chromium --headed %* 
if errorlevel 1 exit /b 1
