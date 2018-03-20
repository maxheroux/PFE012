#!bin/python
from flask import Flask
from flask import request
from TemperatureHandler import TemperatureHandler
from models.peripheral import Peripheral
from utilities.bashProcessHandler import PeripheralCreationProcess
import json

app = Flask(__name__)
# rfcomm0_port = '/dev/rfcomm0'
# temperatureHandler = TemperatureHandler(1, rfcomm0_port)

# deviceMap = {1: temperatureHandler}
deviceMap = {}


@app.route('/state/request', methods=['POST'])
def stateRequest():
    data = json.loads(request.data)
    deviceId = data['peripheralId']
    if not deviceMap.has_key(deviceId):
        return json.dumps({"error":"Device Id {} Not found".format(deviceId)})
    deviceHandler = deviceMap.get(deviceId)
    return deviceHandler.get_data()

@app.route('/state/change', methods=['POST'])
def stateChange():
    data = json.loads(request.data)
    deviceId = data['peripheralId']
    state_value = data['value']
    if not deviceMap.has_key(deviceId):
        return json.dumps({"error":"Device Id {} Not found".format(deviceId)})
    deviceHandler = deviceMap.get(deviceId)
    response = deviceHandler.change_state(state_value)
    return response


@app.route('/peripheral/add', methods=['POST'])
def addPeripheral():
    if "bluetoothId" in str(request.data):
        peripheral = json.loads(request.data, Peripheral.peripheral_object_hook)
        if peripheral.id not in deviceMap:
            new_rfcomm = PeripheralCreationProcess.create_peripheral(peripheral.bluetoothId)
            temperatureHandler = TemperatureHandler(peripheral.id, new_rfcomm)
            deviceMap[peripheral.id] = temperatureHandler
        else:
            return "Peripheral ID {} already exists".format(peripheral.id)

    return "OK!"

if __name__ == '__main__':
    app.run(host='0.0.0.0')
