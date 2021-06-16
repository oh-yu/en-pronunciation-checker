import sys
import requests
import json
from googletrans import Translator

data = sys.stdin.readline() 
#console.log("④sample.py: 「I receive data from ./api」")

# en -> jp
tr = Translator()
data = tr.translate(text=data,dest="ja").text

# API
headers = {'content-type':'text/json'}
payload = {'utterance':data}
url = 'https://www.chaplus.jp/v1/chat?apikey=60c8ce54d33c9'
data = requests.post(url=url, headers=headers, data=json.dumps(payload))
data = data.json()['bestResponse']['utterance']

# jp -> en
data = tr.translate(text=data,src="ja",dest="en").text
print(data)