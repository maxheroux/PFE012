#!bin/python
from flask import Flask
from flask import request
from TemperatureHandler import TemperatureHandler
from LightHandler import LightHandler
from LockHandler import LockHandler
from models.peripheral import Peripheral
from models.domicile import Domicile
from utilities.bashProcessHandler import PeripheralCreationProcess
from dataAccess.peripheral import Peripheral_DAO
from dataAccess.domicile import DomicileConfigurationDAO
from dataAccess.rfidTag import RfidTag_DAO
from ScheduleHandler import ScheduleHandler
import json

import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

SERVER_ADDRESS = "http://vps170412.vps.ovh.ca:8080"
# SERVER_ADDRESS = "http://192.168.0.166:8080"


app = Flask(__name__)

deviceMap = {}
# scheduleHandler = ScheduleHandler(deviceMap, None)


@app.route('/state/request', methods=['POST'])
def stateRequest():
    data = json.loads(request.get_data())
    deviceId = int(data['peripheralId'])
    if deviceId not in deviceMap:
        return json.dumps({"error": "Device Id {} Not found".format(deviceId)})
    deviceHandler = deviceMap.get(deviceId)
    print(deviceHandler.get_data())
    return deviceHandler.get_data()


@app.route('/state/change', methods=['POST'])
def stateChange():
    data = json.loads(request.get_data())
    deviceId = int(data['peripheralId'])
    state_value = data['value']
    if deviceId not in deviceMap:
        return json.dumps({"error": "Device Id {} Not found".format(deviceId)})
    deviceHandler = deviceMap.get(deviceId)
    deviceHandler.change_state(state_value)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/domicile/setup', methods=['POST'])
def setup_domicile_config():
    domicile = json.loads(request.get_data().decode("utf-8"), object_hook=Domicile.domicile_object_hook)
    DomicileConfigurationDAO().save_domicile_configuration(domicile)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/rfidtag/add', methods=['POST'])
def add_rfid_tag():
    data = json.loads(request.get_data())
    RfidTag_DAO().add_tag(data["tagId"])
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/horaire/change', methods=['POST'])
def scheduleChange():
    schedule = json.loads(request.get_data())
    # scheduleHandler.update_schedule(schedule)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/peripheral/add', methods=['POST'])
def addPeripheral():
    try:
        print(request.get_data())
        peripheral = json.loads(request.get_data())
        peripherals = Peripheral.peripheral_object_hook(peripheral)
        peripheral_dao = Peripheral_DAO()
        for peripheral in peripherals:
            if peripheral.id not in deviceMap:

                new_rfcomm = PeripheralCreationProcess.create_peripheral(peripheral.bluetooth_id)
                if new_rfcomm is None:
                    print("Creation failed for peripheral {}".format(peripheral.id))
                else:
                    print("New RFOCMM is {}".format(new_rfcomm))
                    peripheral_dao.add_peripheral(peripheral, new_rfcomm)

                    if peripheral.type.lower() == "thermostat":
                        temperature_handler = TemperatureHandler(peripheral.id, new_rfcomm,
                                                                 SERVER_ADDRESS)
                        deviceMap[peripheral.id] = temperature_handler
                    elif peripheral.type.lower() == "lock":
                        rfid_handler = LockHandler(peripheral.id, new_rfcomm)
                        deviceMap[peripheral.id] = rfid_handler
                    elif peripheral.type.lower() == "light":
                        light_handler = LightHandler(peripheral.id, new_rfcomm)
                        deviceMap[peripheral.id] = light_handler

        # scheduleHandler.update_devices(deviceMap)

    except Exception as e:
        print(e)
        return "Bad JSON format"
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


def initialize_peripherals():
    peripherals = Peripheral_DAO().get_peripherals()

    for peripheral in peripherals:
        if peripheral.type.lower() == "thermostat":
            temperature_handler = TemperatureHandler(peripheral.id, peripheral.rfcomm_device, SERVER_ADDRESS)
            deviceMap[peripheral.id] = temperature_handler
        elif peripheral.type.lower() == "lock":
            lock_handler = LockHandler(peripheral.id, peripheral.rfcomm_device)
            deviceMap[peripheral.id] = lock_handler
        elif peripheral.type.lower() == "light":
            light_handler = LightHandler(peripheral.id, peripheral.rfcomm_device)
            deviceMap[peripheral.id] = light_handler

    # scheduleHandler.update_devices(deviceMap)


PeripheralCreationProcess.bind_peripherals()
initialize_peripherals()

if __name__ == '__main__':
    app.run(host='0.0.0.0')
