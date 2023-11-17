OS := $(shell uname)

i:
	cd server npm install &
	cd app/src && npm install

dev:
	ifeq ($(OS),Windows_NT)
		for /f "tokens=5" %a in ('netstat -aon ^| find "3000"') do taskkill /f /pid %a
	else
		lsof -t -i :3000 | xargs kill -9 || true
	endif
		cd server && node index.js &
		cd app/src && npm run start
