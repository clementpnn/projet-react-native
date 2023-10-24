i:
	cd server && pip install websockets &
	cd app/src && npm install

dev:
	cd server && python3 main.py &
	cd app/src && npm run web