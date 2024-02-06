from flask import Flask, jsonify, request
from optparse import OptionParser
from random import randint
import random
import time
import os.path
import subprocess
import shlex

from vturtle import Turtle

VERBOSE = 'verbose'

config = {
    VERBOSE: False
}

app = Flask(__name__)

turtle = Turtle()


def validate_status_code(status_code):
    if status_code < 600:
        return True
    return False


@app.after_request
def allow_access(response):
    # prevent CORS
    response.headers["access-control-allow-origin"] = "*"
    return response


@app.route('/')
def index():
    turtle.reset()
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def path(path):
    return app.send_static_file(path)


@app.after_request
def allow_access(response):
    # prevent CORS
    response.headers["access-control-allow-origin"] = "*"
    return response


@app.route('/json', methods=['POST'])
def json_echo():
    status_code = request.args.get('status') or 200
    status_code = int(status_code)
    if not validate_status_code(status_code):
        status_code = 200

    data = request.get_json(force=True)

    action = data["cmd"]["action"]
    if action == "distance":
        data["result"] = random.randint(20, 300)
    else:
        data["result"] = getattr(turtle, action)(*data["cmd"].get("params", {}).values())

    if config[VERBOSE]:
        pprint(data)

    response = jsonify(data)
    response.status_code = status_code

    # sleep_s = randint(1, 7)
    # print('Sleeping for %ds' % sleep_s)
    # time.sleep(sleep_s)

    return response


@app.route('/brython_modules', methods=['POST'])
def build_brython_modules():
    modules = request.get_data().decode()
    bundle = '../vendor/brython/.bundle-include'

    if os.path.exists(bundle):
        print("File {} exists".format(bundle))
        print("Got new list of modules:")
        print(modules.split())
        with open(bundle, 'w') as incl:
            print(modules, file=incl)

    build_brython = "python -m brython --modules"
    output = subprocess.check_output(
        shlex.split(build_brython),
        cwd='../vendor/brython')
    print(output.decode())
    return output.decode()


def main():
    parser = OptionParser()
    parser.add_option('-p', '--port', dest='port', default=5000,
                      help='port to run server on - default 5000')
    parser.add_option('-a', '--address', dest='bind', default='127.0.0.1',
                      help='address to bind to - defaults to 127.0.0.1')
    parser.add_option('-v', '--verbose', dest='verbose',
                      default=False, action='store_true', help='increased verbosity - outputs response to console')
    parser.add_option('-d', '--debug', dest='debug',
                      default=False, action='store_true', help='enable debug mode in flask')

    (options, args) = parser.parse_args()

    config[VERBOSE] = options.verbose

    app.debug = options.debug
    app.run(port=int(options.port), host=options.bind)

if __name__ == '__main__':
    main()
