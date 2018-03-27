
import json
from perpetualTimer import PerpetualTimer
from BluetoothHandler import BluetoothHandler

# TODO: Send something to server if a device isn't found, to let it know that it cannot be used
class TemperatureHandler:
    def __init__(self, device_id, port):
        self.device_id = device_id
        self.port = port
        self.periodic_poll_delay = 2
        self.last_temperature = 0
        self.last_humidity = 0
        self.requested_temperature = 15
        self.bluetooth_handler = BluetoothHandler(device_id, port)
        self.request_timer = PerpetualTimer(self.periodic_poll_delay, self.request_temperature)
        self.reader_timer = PerpetualTimer(self.periodic_poll_delay, self.read_temperature)
        self.request_timer.start()
        self.reader_timer.start()

    def get_data(self):
        return json.dumps({"deviceId": self.device_id,"currentTemperature": self.last_temperature, "requestedTemperature": self.requested_temperature, "currentHumidity":self.last_humidity})

    #TODO: put a comment with state_value format (what it is)
    def change_state(self, state_value):
        self.requested_temperature = state_value
        self.bluetooth_handler.send(json.dumps(
            {"messageType":"update", "updateType":"RequestedTemperature", "updateValue":state_value}))

    def request_temperature(self):
        self.bluetooth_handler.send(json.dumps(
            {"messageType": "read"}))

    def read_temperature(self):

            message = self.bluetooth_handler.read()
            if message != None:
                message = json.loads(message)
                if "RequestedTemperature" in message:
                    self.requested_temperature = message['RequestedTemperature']
                    self.last_temperature = message['CurrentTemperature']
                    self.last_humidity = message['Humidity']

#           TODO: Handle other messages if needed (Alert)
