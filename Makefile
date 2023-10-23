i:
	cd server && pip install websockets &
	cd app && npm install

dev:
	cd server && python3 main.py &
	cd app && npm run web