#!/usr/bin/python

from optparse import make_option, OptionParser
from messenger import Connection
import os
import sys

import tornado
from tornado import httpserver
from sockjs.tornado import SockJSRouter, SockJSConnection

STATIC_URL = '/static/'
FILE_ROOT = os.path.dirname(__file__)

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("templates/index.html", STATIC_URL=STATIC_URL)

def runloop(addr, port, xheaders, no_keep_alive, use_reloader):
    router = SockJSRouter(Connection, '/updates')
    handlers = [
        (r'/', MainHandler),
        (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': os.path.join(FILE_ROOT, 'static/')}),
    ] + router.urls
    tornado_app = tornado.web.Application(handlers)

    # start tornado web server in single-threaded mode
    # instead auto pre-fork mode with bind/start.
    http_server = httpserver.HTTPServer(tornado_app, xheaders=xheaders, no_keep_alive=no_keep_alive)
    http_server.listen(int(port), address=addr)

    main_loop = tornado.ioloop.IOLoop.instance()
    try:
        print "Runing on :{port}".format(port=port)
        main_loop.start()

    except KeyboardInterrupt:
        print "Stopped"
        sys.exit(0)

    if use_reloader:
        # Use tornado reload to handle IOLoop restarting.
        from tornado import autoreload
        autoreload.start()

    quit_command = (sys.platform == 'win32') and 'CTRL-BREAK' or 'CONTROL-C'
    print quit_command + " to quit."

def init():
    option_list = (
        make_option('--reload', action='store_true',
            dest='use_reloader', default=True,
            help="Tells Tornado to use auto-reloader."),
        make_option('--admin', action='store_true',
            dest='admin_media', default=False,
            help="Serve admin media."),
        make_option('--adminmedia', dest='admin_media_path', default='',
            help="Specifies the directory from which to serve admin media."),
        make_option('--noxheaders', action='store_false',
            dest='xheaders', default=True,
            help="Tells Tornado to NOT override remote IP with X-Real-IP."),
        make_option('--nokeepalive', action='store_true',
            dest='no_keep_alive', default=False,
            help="Tells Tornado to NOT keep alive http connections."),
    )
    parser = OptionParser(option_list=option_list)
    (options, args) = parser.parse_args()

    help = "Starts a Tornado Web."
    addr = '0.0.0.0'
    port = '8000'

    if not port.isdigit():
        raise CommandError("%r is not a valid port number." % port)

    use_reloader = options.use_reloader

    serve_admin_media = options.admin_media

    xheaders = options.xheaders
    no_keep_alive = options.no_keep_alive

    runloop(addr, port, xheaders, no_keep_alive, use_reloader)


if __name__ == "__main__":
    init()

