import logging
from random import random
from time import sleep

from werkzeug.wrappers import Request, Response, ResponseStream

logger = logging.getLogger("phogo_dev.middleware.turtle")


class TurtleMiddleware:
    """
    Simple WSGI middleware
    """

    def __init__(self, app, min_delay=0, max_delay=0):
        self.app = app

        self.min_delay = min_delay
        self.max_delay = max_delay
        if self.min_delay > self.max_delay:
            self.min_delay = self.max_delay

    def __call__(self, environ, start_response):
        request = Request(environ)
        # these are hardcoded for demonstration
        # verify the username and password from some database or env config variable
        request = Request(environ)
        # just do here everything what you need
        response = self.app(environ, start_response)

        if self.app.verbose:
            logger.info(
                "path: %s, url: %s [%d]"
                % (request.path, request.url, response.status_code)
            )

        if self.max_delay > 0:
            sleep(random() * (self.max_delay - self.min_delay) + self.min_delay)

        return response(environ, start_response)


class TurtleFailure:
    def __init__(self, app, chance=0.1):
        self.app = app
        self.chance = chance

    def __call__(self, environ, start_response):
        request = Request(environ)
        if random() < self.chance:
            response = Response("Random Internal Server Error", status=500)
            return response(environ, start_response)

        response = self.app(environ, start_response)

        if response.status_code >= 500:
            logger.error(
                "path: %s, url: %s [%d]"
                % (request.path, request.url, response.status_code)
            )

        return response(environ, start_response)
