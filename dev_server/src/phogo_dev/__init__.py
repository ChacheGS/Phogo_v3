from dataclasses import dataclass


@dataclass
class PhogoConfig:
    verbose: bool = True
    debug: bool = False
    port: int = 5000
    bind: str = "127.0.0.1"
    delay: int = 0
    failure: float = 0.01
