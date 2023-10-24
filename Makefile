OS := $(shell uname)

i:
	cd server && pip install websockets &
	cd app/src && npm install

dev:
ifeq ($(OS),Windows_NT)
	for /f "tokens=5" %a in ('netstat -aon ^| find "8080"') do taskkill /f /pid %a
else
	lsof -t -i :8080 | xargs kill -9 || true
endif
	cd server && python main.py &
	cd app/src && npm run web
