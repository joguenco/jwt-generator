# JWT Generator
Web application for generate JWT token

## Features
- Python code
- FastAPI server
- Generate JWT from web paga form

## Create python virtual environment
```
python3.14 -m venv venv
```
## Activate python virtual environment
- bash, zsh
```
. venv/bin/activate
```
- fish
```
. venv/bin/activate.fish
```
## Update pip and tools
```
pip install -U pip
pip install --upgrade wheel
pip install --upgrade setuptools
```
## Install dependencies
```
pip install -r requirements.txt
```
### Check syntax
```
ruff check .
```
### Format
```
ruff format .
```
## Run app
```
uvicorn src.main:app --port=9009 --reload --log-config=log_conf.yaml
```
## Access
```
http://127.0.0.1:8000
```
## Swagger
```
http://127.0.0.1:8000/docs
```
## Redoc
```
http://127.0.0.1:8000/redoc
```
## Docker
### Docker compose
```
docker-compose up -d
```
```
docker-compose down
```
### Rebuild
```
docker-compose up --build -d
```