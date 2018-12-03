@echo off

set LAST_CD=%cd%

cd /d E:\Emscripten SDK\emsdk-master

call emsdk_env.bat

%LAST_CD:~0,2%

cd %LAST_CD% 

echo done!