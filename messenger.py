from tornado import web, ioloop
from sockjs.tornado import SockJSRouter, SockJSConnection
from game import GameState, Player
import simplejson as json

class Connection(SockJSConnection):
    participants = set()
    game_state = GameState()

    def on_open(self, info):
        sessid = self.session.session_id
        # Send that someone joined
        self.broadcast_text("{id} joined.".format(id=sessid))

        self.send_obj('session', {'session_id': sessid})

        # Add client to the clients list
        self.participants.add(self)
        self.game_state.add_player(sessid)

        self.debug()
        periodic = ioloop.PeriodicCallback(self.send_state, 50)
        periodic.start()

    def on_message(self, text):
        message = json.loads(text)
        if message['action'] == 'move':
            player = message['body']['session']
            x = message['body']['x']
            y = message['body']['y']
            dx = message['body']['dx']
            dy = message['body']['dy']
            hat_owner = 0
            speech = message['body']['speech']
            if message['body'].has_key('hat_owner'):
                hat_owner = int(message['body']['hat_owner'])

            self.game_state.players[player].position.update(x, y)
            self.game_state.players[player].movement.update(dx, dy)
            self.game_state.players[player].speech = speech;
            if hat_owner:
                try:
                    self.game_state.assign_hat(player);
                except KeyError:
                    pass

            self.send_obj('ack', {})

    def on_close(self):
        sessid = self.session.session_id
        # Remove client from the clients list and broadcast leave message
        self.game_state.remove_player(sessid)
        self.participants.remove(self)
        self.broadcast_text("{id} left.".format(id=sessid))
        self.debug()

    def debug(self):
        print self.game_state.__dict__

    def send_obj(self, action, object):
        self.send(json.dumps({'action': action, 'body': object}))

    def broadcast_text(self, text):
        json_message = json.dumps({'action': 'log', 'body': {'message': text}})
        self.broadcast(self.participants, json_message)

    def send_state(self):
        self.send_obj('state', self.game_state.dictify())

