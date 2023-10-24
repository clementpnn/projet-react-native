i:
	cd server && pip install websockets &
	cd app/src && npm install

dev:
	lsof -t -i :8080 | xargs kill -9 || true &
	cd server && python main.py &
	cd app/src && npm run web
