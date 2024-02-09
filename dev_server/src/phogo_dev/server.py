import os
import shlex
import subprocess
from pprint import pprint

from flask import Flask, jsonify, request

from phogo_dev import PhogoConfig
from phogo_dev.middleware import TurtleFailure, TurtleMiddleware

app = Flask(__name__.split(".")[0])


@app.after_request
def allow_access(response):
    response.headers["access-control-allow-origin"] = "*"
    # response.headers["access-control-allow-headers"] = "origin, x-requested-with, content-type, accept"
    return response


@app.route("/brython_modules", methods=["POST"])
def build_brython_modules():
    modules = request.get_data().decode()
    bundle = "../vendor/brython/.bundle-include"

    if os.path.exists(bundle):
        print("File {} exists".format(bundle))
        print("Got new list of modules:")
        print(modules.split())
        with open(bundle, "w") as incl:
            print(modules, file=incl)

    build_brython = "python -m brython --modules"
    output = subprocess.check_output(
        shlex.split(build_brython), cwd="../vendor/brython"
    )
    print(output.decode())
    return output.decode()


@app.route("/json", methods=["POST"])
def json_echo():
    status_code = 200
    try:
        req = request.get_json(force=True)
    except:
        return {"result": "error"}

    try:
        print("R:", type(req), req)
        # rec = json.loads(data)
        data = {
            "cmd_id": req["cmd_id"],
            "cmd": {"action": request["cmd"]["action"], "result": "OK"},
        }
    except:
        data = {"result": "error"}
        status_code = 500

    data = jsonify(data)

    if app.verbose:
        pprint(f"Request: {request}")
        pprint(f"Response: {data}")

    response = data
    response.status_code = status_code

    return response


def start(config: PhogoConfig) -> None:
    app.wsgi_app = TurtleMiddleware(
        app.wsgi_app,
        min_delay=config.delay / 2,
        max_delay=config.delay,
    )
    app.wsgi_app = TurtleFailure(
        app.wsgi_app,
        chance=config.failure,
    )

    app.phogo = config.verbose
    app.run(port=config.port, host=config.bind, debug=config.debug)
