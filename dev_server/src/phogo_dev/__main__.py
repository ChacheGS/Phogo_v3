import argparse

from phogo_dev import PhogoConfig
from phogo_dev.server import start


def config() -> PhogoConfig:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-p",
        "--port",
        dest="port",
        default=5000,
        help="port to run server on - default 5000",
    )
    parser.add_argument(
        "-a",
        "--address",
        dest="bind",
        default="127.0.0.1",
        help="address to bind to - defaults to localhost",
    )
    parser.add_argument(
        "-v",
        "--verbose",
        dest="verbose",
        action="store_true",
        help="increased verbosity - outputs response to console",
    )
    parser.add_argument(
        "-d",
        "--debug",
        dest="debug",
        action="store_true",
        help="enable debug mode in flask",
    )
    parser.add_argument(
        "--delay",
        dest="delay",
        default=0,
        help="delay in seconds to simulate slow response. min_delay will be half of this value",
        type=int,
    )
    parser.add_argument(
        "--failure",
        dest="failure",
        default=0.1,
        help="chance of failure in the response",
        type=float,
    )

    args = parser.parse_args()

    return PhogoConfig(**args.__dict__)


def main() -> None:
    conf = config()
    start(conf)
