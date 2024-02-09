Phogo Dev Server
---

To get started with this server, you need:
- Python version: 3.12.1
  - I recommend using `pyenv` to manage your python versions
  - Recommended with `pyenv-virtualenv` to manage your virtual environments
- Poetry (currently version 1.7.1) as package manager (https://python-poetry.org/docs/)

To install the required python version and create a virtual environment, you can use the following commands:
```bash
pyenv install 3.12.1
pyenv virtualenv 3.12.1 phogo
pyenv activate phogo  # the repository contains a .python-version file, so this should be automatic
```

Check that poetry can use your virtual environment:
```bash
poetry env info
```
Which should output something like:
```bash
Virtualenv
Python:         3.12.1
Implementation: CPython
Path:           /home/carlos/.pyenv/versions/3.12.1/envs/phogo
Executable:     /home/carlos/.pyenv/versions/3.12.1/envs/phogo/bin/python
Valid:          True

System
Platform:   linux
OS:         posix
Python:     3.12.1
Path:       /home/carlos/.pyenv/versions/3.12.1
Executable: /home/carlos/.pyenv/versions/3.12.1/bin/python3.12
```

Then, you can install the dependencies with:
```bash
poetry install
poetry run phogo  # to run the server
```

If you have any issues with the above commands, please refer to the documentation of the respective tools.
