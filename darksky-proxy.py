from flask import Flask
from flask import Response
from flask import request
from flask_cors import CORS
from requests import get

#import logging

app = Flask('__main__')
CORS(app)
SITE_NAME = 'https://api.darksky.net/forecast/27c94f97935cf5b9915b3ff05d7dcc87/'
#logging.basicConfig(level=logging.INFO)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')

def proxy(path):
  #logging.info("URL abaixo:")
  url = f"{SITE_NAME}{path}"
  #headers = { "Access-Control-Allow-Origin" : "*" }
  req = get(url, stream=True, params=request.args).content
  resp = Response(req, status=200, mimetype='application/json')
  return resp

app.run(host='0.0.0.0', port=8080)


