#!bin/python
from flask import Flask
from flask import request
from TemperatureHandler import TemperatureHandler
from LightHandler import LightHandler
from RfidHandler import RfidHandler
from models.peripheral import Peripheral
from models.domicile import Domicile
from utilities.bashProcessHandler import PeripheralCreationProcess
from dataAccess.peripheral import Peripheral_DAO
from dataAccess.domicile import DomicileConfigurationDAO
import json

#98:D3:31:B3:D5:DD

SERVER_ADDRESS = "http://vps170412.vps.ovh.ca:8080"
# SERVER_ADDRESS = "http://192.168.0.166:8080"


peripheral_dao = Peripheral_DAO()
domicile_dao = DomicileConfigurationDAO()

app = Flask(__name__)

deviceMap = {}

@app.route('/state/request', methods=['POST'] )
def stateRequest():
    data = json.loads(request.get_data())
    deviceId = data['peripheralId']
    if deviceId not in deviceMap:
        return json.dumps({"error":"Device Id {} Not found".format(deviceId)})
    deviceHandler = deviceMap.get(deviceId)
    return deviceHandler.get_data()

@app.route('/state/change', methods=['POST'])
def stateChange():
    data = json.loads(request.get_data())
    deviceId = data['peripheralId']
    state_value = data['value']
    if deviceId not in deviceMap:
        return json.dumps({"error":"Device Id {} Not found".format(deviceId)})
    deviceHandler = deviceMap.get(deviceId)
    deviceHandler.change_state(state_value)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@app.route('/domicile/setup', methods=['POST'])
def setup_domicile_config():
    print(request.get_data())
    domicile = json.loads(request.get_data().decode("utf-8"), object_hook=Domicile.domicile_object_hook)
    domicile_dao.save_domicile_configuration(domicile)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/peripheral/add', methods=['POST'])
def addPeripheral():

    try:
        peripheral = json.loads(request.get_data().decode("utf-8"))
        peripherals = Peripheral.peripheral_object_hook(peripheral)
        for peripheral in peripherals:
            if peripheral.id not in deviceMap:

                new_rfcomm = PeripheralCreationProcess.create_peripheral(peripheral.bluetooth_id)
                if new_rfcomm is None:
                    print("Creation failed for peripheral {}".format(peripheral.id))
                else:
                    peripheral_dao.add_peripheral(peripheral, new_rfcomm)
                    temperature_handler = TemperatureHandler(peripheral.id, new_rfcomm)
                    deviceMap[peripheral.id] = temperature_handler
    except Exception as e:
        print(e)
        return "Bad JSON format"
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


def initialize_peripherals():

    peripherals = peripheral_dao.get_peripherals()

    for peripheral in peripherals:
        if peripheral.type.lower() == "thermostat":
            temperature_handler = TemperatureHandler(peripheral.id, peripheral.rfcomm_device, SERVER_ADDRESS)
            deviceMap[peripheral.id] = temperature_handler
        elif peripheral.type.lower() == "rfidreader":
            rfid_handler = RfidHandler(peripheral.id, peripheral.rfcomm_device)
            deviceMap[peripheral.id] = rfid_handler

initialize_peripherals()


if __name__ == '__main__':
    app.run(host='0.0.0.0')
