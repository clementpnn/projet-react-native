OS := $(shell uname)

i:
	@cd server && npm install
	@cd app/src && npm install
	@if not exist "server\.env" echo DB_URL="" > server\.env
	@if not exist "server\.env" echo JWT_SECRET="" >> server\.env

dev:
ifeq ($(OS),Windows_NT)
	@for /f "tokens=5" %a in ('netstat -aon ^| find "3000"') do taskkill /f /pid %a
else
	@lsof -t -i :3000 | xargs kill -9 || true
endif
	@cd server && node index.js &
	@cd app/src && npm run web