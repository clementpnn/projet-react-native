i:
	cd server && pip install websockets &
	cd app/src && npm install

dev:
	cd server && python main.py &
	cd app/src && npm run web