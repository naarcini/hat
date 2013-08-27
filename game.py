from random import choice

class GameState(object):

    def __init__(self):
        self.players = {}
        self.hat = Hat()
        print "Blank game initiated"

    def add_player(self, session_id):
        player = Player(session_id)
        self.players[session_id] = player
        return player

    def remove_player(self, session_id):
        if self.hat.owner == session_id:
            self.hat.owner = None
            self.hat.position.update(self.players[session_id].position.x, self.players[session_id].position.y)
        del self.players[session_id]

    def assign_hat(self, session_id):
        if self.hat.owner is not None:
            raise KeyError('Hat is already being worn')
        else:
            self.hat.owner = session_id

    def dictify(self):
        players = {}
        hat = self.hat.dictify()
        for key, val in self.players.items():
            players[key] = val.dictify()
        return {'players': players, 'hat': hat}

class Player(object):
    # Guy types should be updated if new character models added
    guy_types = [1, 2, 3]

    def __init__(self, session_id):
        self.id = session_id
        # Player initial spawn position
        self.position = Position(0, 0)
        self.movement = Movement(0, 0)
        self.character = choice(self.guy_types)
        self.speech = None;

    def move(self, x, y, dx, dy):
        self.position.update(x, y)
        self.movement.update(dx, dy)

    def dictify(self):
        return {'id': self.id, 'position': {'x': self.position.x, 'y': self.position.y}, 'character': self.character, 'movement': {'dx': self.movement.dx, 'dy': self.movement.dy}, 'speech': self.speech}

class Hat(object):
    def __init__(self):
        # Initial starting position of hat defined here.
        self.position = Position(700, 700)
        self.owner = None

    def dictify(self):
        return {'owner': self.owner, 'x': self.position.x, 'y': self.position.y}

class Position(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def update(self, x, y):
        self.x = x
        self.y = y

class Movement(object):
    def __init__(self, dx, dy):
        self.dx = dx
        self.dy = dy

    def update(self, dx, dy):
        self.dx = dx
        self.dy = dy
