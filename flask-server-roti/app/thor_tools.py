import os
import json

import requests

from backpacker.firebase import get_backpacker_document, set_backpacker_document
from model.runlogs import RunLogs


def print_pretty(obj):
    pretty = json.dumps(obj, indent=4)
    print(pretty)


base_url = os.getenv("BACKPACKER_BASE_URL")


def get_backpacker_locations(collection='locationV2'):
    url = f"{base_url}/starkbase/getAll"
    payload = json.dumps({
        "collId": collection
    })
    headers = {
        'Content-Type': 'application/json'
    }
    data = requests.post(url, data=payload, headers=headers)
    docs = data.json()

    # location : {
    #     "name": "123 Address Street",
    #     "coordinates": [ -122.1234, 37.812 ],
    # }

    locations = []
    for doc in docs['collection']:
        locations.append({
            "address": doc['docData'].get("address", {}),
            "name": doc['docData'].get("name")
        })
    return locations


def generate_backpacker_query(user_locations, vehicle_count):
    """
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    backpacker payload format
    {
        "version": 1,
        "locations": [...],
        "vehicles": [...],
        "services": [...],
        "shipments": [...]
        "options": {
            "objectives": []
        }
    }
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    """
    warehouse, _ = get_backpacker_document(collId='warehouse', docId='kitchen-1')
    # adding warehouse location
    locations = [{
        "name": warehouse.get("name"),
        "coordinates": [warehouse['address']['lng'], warehouse['address']['lat']],
    }]
    # adding all users location and giving locations a custom name
    locations.extend([
        {
            "name": f"{idx + 1}. " +
                    f"{loc.get('address', {}).get('streetSocity', '')} " +
                    f"{loc.get('address', {}).get('city', '')} " +
                    f"{loc.get('address', {}).get('state', '')}",
            "coordinates": [loc['address']['lng'], loc['address']['lat']],
        }
        for idx, loc in enumerate(user_locations)
    ])

    vehicles = [{"name": f"car-{i}", "start_location": warehouse['name']} for i in range(vehicle_count)]

    shipments = []
    for idx, loc in enumerate(user_locations):
        parcel = {
            "name": f"{idx+1}-{loc['name']}",
            "from": warehouse['name'],
            "to": f"{idx + 1}. " +
                  f"{loc.get('address', {}).get('streetSocity', '')} " +
                  f"{loc.get('address', {}).get('city', '')} " +
                  f"{loc.get('address', {}).get('state', '')}",
        }
        shipments.append(parcel)
    # print(locations, "\n" ,shipments)

    options = {
        "objectives": ["min-schedule-completion-time"]
    }

    payload = {
        "version": 1,
        "locations": locations,
        "vehicles": vehicles,
        "shipments": shipments,
        "options": options
    }

    return payload


def generate_direction_query(optimization):
    query_string = ''
    for stop in optimization['stops']:
        coords = stop['location_metadata']['snapped_coordinate']
        q = str(coords[0]) + ',' + str(coords[1]) + ';'
        query_string = query_string + q
    return {"coords": query_string[:-1]}


def generate_batched_direction_query(optimization):
    def extract_coordinates_string(s):
        coords = s['location_metadata']['snapped_coordinate']
        return str(coords[0]) + ',' + str(coords[1]) + ';'

    def process_small_list(_small_list):
        qs = ''
        for stop in _small_list:
            qs = qs + extract_coordinates_string(stop)
        return qs

    batch_size = 20
    all_batches = []
    itr = 0

    query_string = ''
    while itr < len(optimization['stops']):
        small_list = optimization['stops'][itr: itr + batch_size]
        all_batches.append(query_string + process_small_list(small_list)[:-1])
        query_string = extract_coordinates_string(small_list[-1])
        itr = itr + batch_size
    # print(all_batches)
    return all_batches


def generate_runlog_id(routeId):
    new_doc = RunLogs(routeId, None, None)
    res, _ = set_backpacker_document("runlogs", new_doc.get_runlog_id(), new_doc.get_obj())
    runlogId = res.get('Document written with ID', None)

    return runlogId


def process_base64_image(encoded_img):
    import base64
    # decode base64 string data
    decoded_data = base64.b64decode(encoded_img)
    # img_file = open('image.jpeg', 'wb')
    # img_file.write(decoded_data)
    # img_file.close()
    return decoded_data
