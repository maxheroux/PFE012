#!bin/python
from flask import Flask
from flask import request
from TemperatureHandler import TemperatureHandler
import json

app = Flask(__name__)
rfcomm0_port = '/dev/rfcomm0'
temperatureHandler = TemperatureHandler(0, rfcomm0_port)

deviceMap = {0: temperatureHandler}
# deviceMap = {}

@app.route('/state/request', methods=['POST'] )
def stateRequest():
    data = request.get_json()
    deviceId = data['peripheralId']
    if deviceId not in deviceMap:
        return json.dumps({"error":"Device Id {} Not found".format(deviceId)})
    deviceHandler = deviceMap.get(deviceId)
    return deviceHandler.get_data()

@app.route('/state/change', methods=['POST'])
def stateChange():
    data = request.get_json()
    deviceId = data['peripheralId']
    state_value = data['value']
    if deviceId not in deviceMap:
        return json.dumps({"error":"Device Id {} Not found".format(deviceId)})
    deviceHandler = deviceMap.get(deviceId)
    response = deviceHandler.change_state(state_value)
    return response


@app.route('/peripheral/add', methods=['POST'])
def addPeripheral():

    try:
        peripheral = json.loads(request.get_json(), object_hook=Peripheral.peripheral_object_hook)
        if peripheral.id not in deviceMap:
            print("device id :{}".format(peripheral.id))
            new_rfcomm = PeripheralCreationProcess.create_peripheral(peripheral.bluetoothId)
            if new_rfcomm is None:
                return "Creation failed"
            else:
                temperatureHandler = TemperatureHandler(peripheral.id, new_rfcomm)
                deviceMap[peripheral.id] = temperatureHandler
        else:
            return "Peripheral ID {} already exists".format(peripheral.id)
    except Exception as e:
        print(e)
        return "Bad JSON format"
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

if __name__ == '__main__':
    app.run(host='0.0.0.0')
