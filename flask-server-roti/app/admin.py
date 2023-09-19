import os

from flask import Blueprint, request, jsonify

from app.thor_tools import generate_backpacker_query, get_backpacker_locations, generate_direction_query, \
    generate_runlog_id, generate_batched_direction_query
from backpacker.firebase import set_backpacker_document, get_backpacker_document, get_backpacker_documents_count, \
    get_all_documents, backpacker_login
from backpacker.mapbox import get_backpacker_optimization, get_directions, get_batched_directions

admin: Blueprint = Blueprint('admin', __name__, url_prefix='/admin')


@admin.route('/login', methods=['POST'])
def driver_login():
    data = request.json
    print(data)
    email = data.get("email", None)
    password = data.get("password", None)
    status, res = backpacker_login(email, password)

    return jsonify(res), status


@admin.route('/add_new_user', methods=['POST'])
def add_new_user():
    data = request.json
    print(data)
    location = {
        "name": data['name'],
        "coordinates": [data['long'], data['lat']],
    }

    res = set_backpacker_document(collId=data['collId'], docId=location['name'], doc=location)
    return res
    # return 'new user added'


@admin.route('/verify_driver')
def verify_driver():
    return 'driver verified'


@admin.route('/generate_maps', methods=['POST'])
def generate_maps():
    """
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    V1 - Plan
    -->     here we will first collect all the locations in the given cluster
    -->     generate a payload for backpacker/mapbox api
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    V2 - Plan
    -->     here we will fetch all documents in collection
    -->     generate a payload for backpacker/mapbox api
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    :return:
    """
    data = request.json
    locations = get_backpacker_locations(os.getenv("BACKPACKER_ROTY_USERS") or data['collId'])
    backpacker_payload = generate_backpacker_query(locations, int(data['bandwidth']))
    optimizations, status = get_backpacker_optimization(backpacker_payload)
    # return optimizations

    # -----------------------------------------------------------------------------------------------------------------
    #       Postprocessing...
    # -----------------------------------------------------------------------------------------------------------------

    acks = []
    routes = []
    itr = 0
    # print(locations, optimizations)
    for optimization in optimizations["routes"]:
        itr += 1
         # direction_payload = generate_direction_query(optimization)
        # directions = get_directions(direction_payload)

        directions_payload = generate_batched_direction_query(optimization)
        directions = get_batched_directions({'batchedcoords': directions_payload})

        runlogId = generate_runlog_id(f'R{itr}')
        route = {"optimization": optimization, "directions": directions, "runlogId": runlogId, "routeId": f'R{itr}'}
        ack = set_backpacker_document(collId='routes', docId=f'R{itr}', doc=route)

        routes.append(route)
        acks.append(ack)

    # -----------------------------------------------------------------------------------------------------------------
    #       Postprocessing V2...
    # -----------------------------------------------------------------------------------------------------------------

    # set a document in meta table for locations covered under optimizations
    set_backpacker_document(collId="meta", docId="deliverying_locations", doc={'active': len(locations)})
    # set a document in fastloads for all the routes to be retrieved in admin again and again
    set_backpacker_document(collId="fastloads", docId="latest_routes", doc={"_all": routes})

    # return backpacker_payload
    # print(backpacker_payload)
    # return acks
    # return route_plan['routes']
    return {"routes": routes, "acknowledgements": acks}
    # return 'maps generated successfully'


@admin.route('/get_latest_routes', methods=['GET'])
def get_latest_routes():
    """
    this endpoint returns all the routes to be displayed in admin panel
    """
    # routes1 = get_backpacker_locations(collection='routes')
    routes, status = get_backpacker_document(collId='fastloads', docId="latest_routes")

    return {'routes': routes.get("_all", {})}


@admin.route('/get_maps_metadata', methods=['GET'])
def get_maps_metadata():
    """
    this endpoint returns deliverying locations count and active locations count
    """
    total_locations = get_backpacker_documents_count(collId='locationV2')
    delivery_locations, status = get_backpacker_document(collId="meta", docId="deliverying_locations")

    return {'total_locations': total_locations, 'deliverying_locations': delivery_locations}


@admin.route('/get_dashboard_data', methods=['GET'])
def get_dashboard_data():
    """
    this endpoint returns deliverying locations count and active locations count
    """
    _data = get_all_documents('meta')

    return {**(_data)}
