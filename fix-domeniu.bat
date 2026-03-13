@echo off
chcp 65001 >nul
echo.
echo =============================================
echo  FIX DOMENIU: concaverde.ro → conca-verde.ro
echo =============================================
echo.

set ROOT=C:\Users\Diaconu Mihai\Documents\Website\Conca-verde

echo Inlocuiesc in fiecare fisier...
echo.

for %%f in (
  "%ROOT%\index.html"
  "%ROOT%\cazare.html"
  "%ROOT%\restaurant.html"
  "%ROOT%\evenimente.html"
  "%ROOT%\corporate.html"
  "%ROOT%\contact.html"
  "%ROOT%\locatie-activitati.html"
  "%ROOT%\galerie.html"
  "%ROOT%\nunta.html"
  "%ROOT%\404.html"
  "%ROOT%\politica-confidentialitate.html"
  "%ROOT%\termeni.html"
  "%ROOT%\sitemap.xml"
  "%ROOT%\robots.txt"
) do (
  if exist "%%~f" (
    powershell -Command "(Get-Content '%%~f' -Raw -Encoding UTF8) -replace 'concaverde\.ro', 'conca-verde.ro' | Set-Content '%%~f' -Encoding UTF8 -NoNewline"
    echo    [OK] %%~nxf
  ) else (
    echo    [SKIP] %%~nxf - nu exista
  )
)

echo.
echo =============================================
echo  GATA! Verificare:
echo =============================================

echo.
echo Cautare "concaverde.ro" ramas in fisiere...
set FOUND=0
for %%f in ("%ROOT%\*.html" "%ROOT%\*.xml" "%ROOT%\robots.txt") do (
  if exist "%%~f" (
    findstr /i /c:"concaverde.ro" "%%~f" >nul 2>&1
    if not errorlevel 1 (
      echo    [ATENTIE] %%~nxf inca contine concaverde.ro!
      set FOUND=1
    )
  )
)
if %FOUND%==0 (
  echo    PERFECT - niciun fisier nu mai contine "concaverde.ro"
)

echo.
echo Acum push pe cPanel toate fisierele modificate.
echo.
pause
