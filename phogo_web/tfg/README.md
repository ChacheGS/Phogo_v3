# Phogo web

This repository holds the website that controls Phogo v2.

## Installing the environment

* Clone this whole repo
* Install nodejs
* Create a new python3 virtual environment
```bash
$ sudo apt-get update && sudo apt-get install python3-dev python-pip python3-pip
$ sudo pip install virtualenv virtualenvwrapper
$ mkvirtualenv -p python3 your-virtualenv-name
```
* Follow the configuration section [here](https://virtualenvwrapper.readthedocs.io/en/latest/install.html) to setup virtualenvwrapper for your OS.
```bash
$ cd $REPO_FOLDER
$ npm install
$ bower install
$ workon your-virtualenv-name
(your-virtualenv-name) ... $ pip -r requirements.txt
```
## Running the development copy
The actual code lives in `src` and is moved to the `dev` folder to be served by the test server.
```bash
$ cd $REPO_FOLDER
$ gulp dev
```
Open a browser and navigate to http://localhost:3000 for the application or to http://localhost:3000/console.html for a Python3 interactive session that uses the same python distribution as the app (debugging and stuff).