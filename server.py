from websocket_server import WebsocketServer
from json import JSONEncoder
import json
	
rooms = []
spectactor = []
setting = {'command':'get_setting', 'ball_size': 7, 'ball_speed': 7}

class Room:
	playerOne = None
	playerTwo = None
	score1 = 0
	score2 = 0
	def __init__(self, id):
		self.roomId = id

	def __repr__(self):
		data = {'id': self.roomId, 'player_one': self.playerOne, 'player_two': self.playerTwo}
		return json.dumps(data)
	
	def toDict(self):
		data = {'id': self.roomId, 'player_one': self.playerOne != None, 'player_two': self.playerTwo != None}
		return data
	


def getRoomList():
	data = []
	for room in rooms:
		data.append(room.toDict())
	return data

def getRoom(roomId):
	for room in rooms:
		if(str(room.roomId) == str(roomId)):
			return room
	return None

def Join(player, room, playerType):
	if(playerType == 1):
		if(room.playerOne == None):
			room.playerOne = player
			return True
		else:
			return False
	elif(playerType == 2):
		if(room.playerTwo == None):
			room.playerTwo = player
			return True
		else:
			return False
	return False

def AddSpectactor(room_id, client):
	for i, spec in enumerate(spectactor):
		if(str(spec['room_id']) == room_id):
			spectactor[i]['spectactor'].append(client)

def BroadcastToSpectactor(room_id, msg, server):
	for spec in spectactor:
		if(str(spec['room_id']) == room_id):
			for client in spec['spectactor']:
				if(client in server.clients):
					server.send_message(client, json.dumps(msg))



# Called for every client connecting (after handshake)
def new_client(client, server):
	print("New client connected and was given id %d" % client['id'])
	#server.send_message(client, 'Hello')
	#server.send_message_to_all("Hey all, a new client has joined us")
	

# Called for every client disconnecting
def client_left(client, server):
	for room in rooms:
		if(room.playerOne == client):
			room.playerOne = None
			if(room.playerTwo != None):
				msg = {'command': 'player_one_leave'}
				server.send_message(room.playerTwo, json.dumps(msg))
		if(room.playerTwo == client):
			room.playerTwo = None
			if(room.playerOne != None):
				msg = {'command': 'player_two_leave'}
				server.send_message(room.playerOne, json.dumps(msg))


	print("Client(%d) disconnected" % client['id'])


# Called when a client sends a message
def message_received(client, server, message):
	# msg = {'status': True, 'message': 'get_room_list', 'data': getRoomList()}
	# print(message)
	data = json.loads(message)
	# print('client %s ask %s' % (client['id'], data['command']))
	if(data['command'] == 'get_room_list'):
		msg = {'status': True, 'command': 'get_room_list', 'data': getRoomList()}
		server.send_message(client, json.dumps(msg))
	elif(data['command'] == 'player_one_join'):
		room = getRoom(data['data']['room_id'])
		room.score1 = 0
		room.score2 = 0
		res = Join(client, room, 1)
		if res:
			msg = {'status': True, 'command':'player_one_join'}
		else:
			msg = {'status': False, 'command':'player_one_join', 'message': 'Room full or wrong room id'}
		server.send_message(client, json.dumps(msg))
	elif(data['command'] == 'player_two_join'):
		room = getRoom(data['data']['room_id'])
		room.score1 = 0
		room.score2 = 0
		res = Join(client, room, 2)
		if res:
			msg = {'status': True, 'command':'player_two_join'}
		else:
			msg = {'status': False, 'command':'player_two_join', 'message': 'Room full or wrong room id'}
		server.send_message(client, json.dumps(msg))
	elif(data['command'] == 'player_one_position'):
		room = getRoom(data['data']['room_id'])
		msg = {'status': True, 'command': 'player_one_position', 'data': {'position': data['data']['position']}}
		if(room.playerTwo != None):
			server.send_message(room.playerTwo, json.dumps(msg))
		BroadcastToSpectactor(data['data']['room_id'], msg, server)
	elif(data['command'] == 'player_two_position'):
		room = getRoom(data['data']['room_id'])
		msg = {'status': True, 'command': 'player_two_position', 'data': {'position': data['data']['position']}}
		if(room.playerOne != None):
			server.send_message(room.playerOne, json.dumps(msg))
		BroadcastToSpectactor(data['data']['room_id'], msg, server)
	elif(data['command'] == 'ball_position'):
		room = getRoom(data['data']['room_id'])
		msg = {'status': True, 'command': 'ball_position', 'data': {'position': data['data']['position'], 'angle': data['data']['angle']}}
		if(room.playerTwo != None):
			server.send_message(room.playerTwo, json.dumps(msg))
		BroadcastToSpectactor(data['data']['room_id'], msg, server)
	elif(data['command'] == 'spectactor_join'):
		AddSpectactor(data['data']['room_id'], client)
	elif(data['command'] == 'get_setting'):
		server.send_message(client, json.dumps(setting))
	elif(data['command'] == 'add_player_one_score'):
		room = getRoom(data['data']['room_id'])
		room.score1 += 1
	elif(data['command'] == 'add_player_two_score'):
		room = getRoom(data['data']['room_id'])
		room.score2 += 1
	elif(data['command'] == 'get_score'):
		room = getRoom(data['data']['room_id'])
		msg = {'command': 'get_score', 'score_1': room.score1, 'score_2': room.score2}
		server.send_message(client, json.dumps(msg))	


	# server.send_message(client, getRoomList())
	# print("Client(%d) said: %s" % (client['id'], message))
	# server.send_message_to_all(message)



for i in range(4):
	r = Room(i)
	spectactor.append({'room_id': i, 'spectactor': []})
	rooms.append(r)

print('Starting Server...')
PORT=9001
HOST='192.168.1.2'
server = WebsocketServer(PORT, host=HOST)
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
print('Server Running at %s:%s' % (HOST, PORT))
server.run_forever()

