@echo off
:Bot
echo (%time%) Bot started.
node ./src/bot.js
echo (%time%) WARNING: Bot closed or crashed, restarting.
goto Bot