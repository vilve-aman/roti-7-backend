import json
import os

import requests


def print_pretty(obj):
    pretty = json.dumps(obj, indent=4)
    print(pretty)


base_url = os.getenv("BACKPACKER_BASE_URL")


def get_backpacker_optimization(payload):
    url = f"{base_url}/mapbox/optimization"

    payload = json.dumps(payload)
    headers = {
        'Content-Type': 'application/json'
    }
    data = requests.post(url, data=payload, headers=headers).json()
    if not data.get("routes"):
        return {"err": "routes not found"}, 404
    return data, 200


def get_directions(payload):
    url = f"{base_url}/mapbox/direction"

    payload = json.dumps(payload)
    headers = {
        'Content-Type': 'application/json'
    }
    data = requests.post(url, data=payload, headers=headers)

    return data.json()


def get_batched_directions(payload):
    url = f"{base_url}/mapbox/batched-direction"

    payload = json.dumps(payload)
    headers = {
        'Content-Type': 'application/json'
    }
    data = requests.post(url, data=payload, headers=headers)

    return data.json()
