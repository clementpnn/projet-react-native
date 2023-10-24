import asyncio
import websockets
import json
from random import randint

rooms = {}

async def handler(websocket, path):
    global rooms
    
    async for message in websocket:
        data = json.loads(message)
        action = data.get("action")
        
        if action == "create":
            room_code = randint(1000, 9999)
            rooms[room_code] = {'host': websocket, 'guest': None}
            await websocket.send(json.dumps({"action": "created", "room_code": room_code}))
            
        elif action == "join":
            room_code = data.get("room_code")
            room = rooms.get(room_code)
            
            if room and not room['guest']:
                room['guest'] = websocket
                await room['host'].send(json.dumps({"action": "start_game"}))
                await room['guest'].send(json.dumps({"action": "start_game"}))
                
            elif not room:
                await websocket.send(json.dumps({"action": "error", "message": "Room does not exist"}))
            else:
                await websocket.send(json.dumps({"action": "error", "message": "Room is full"}))

start_server = websockets.serve(handler, "0.0.0.0", 8080)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
