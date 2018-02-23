import serial
import threading
import time
import json
from perpetualTimer import PerpetualTimer

class TemperatureHandler:


    def __init__(self, device_id, port):
        self.device_id = device_id
        self.ser = serial.Serial(port, 9600)
        self.periodic_poll_delay = 5
        self.last_temperature = 0
        self.last_humidity = 0
        self.requested_temperature = 15
        self.changing_state = False
        self.read_temperature()
        self.reader_timer = PerpetualTimer(self.periodic_poll_delay, self.read_temperature)
        self.reader_timer.start()

    def get_data(self):
        return json.dumps({"deviceId": self.device_id,"currentTemperature": self.last_temperature, "requestedTemperature": self.requested_temperature, "currentHumidity":self.last_humidity})

    def change_state(self, state_value):
        self.changing_state = True
        self.requested_temperature = state_value
        response = self.read_response(state_value)
        self.changing_state = False
        return response

    def send(self, message):
        self.ser.writelines(message)

    def read(self):
        bytesInBuffer = self.ser.inWaiting()
        while bytesInBuffer <= 0:
            time.sleep(0.2)
            bytesInBuffer = self.ser.inWaiting()
        while bytesInBuffer > 0:
            self.readValue = self.ser.read_until()
            bytesInBuffer = self.ser.inWaiting()
        return self.readValue

    def read_temperature(self):

        if self.changing_state:
            return

        self.send(json.dumps(
            {"messageType": "read"}))
        response = self.read()
        response = json.loads(response)
        self.requested_temperature = response['RequestedTemperature']
        self.last_temperature = response['CurrentTemperature']
        self.last_humidity = response['Humidity']

    def read_response(self, state_value):

        message = json.dumps({"messageType": "update", "updateType": "RequestedTemperature", "updateValue": state_value})
        self.send(message)
        return self.read()


class Reader(threading.Thread):

    def __init__(self, ser):
        threading.Thread.__init__(self)
        self.ser = ser
        self.readValue = None
        self.setDaemon(True)

    def run(self):

        bytesInBuffer = self.ser.inWaiting()
        while bytesInBuffer <= 0:
            time.sleep(0.2)
            bytesInBuffer = self.ser.inWaiting()
        while bytesInBuffer > 0:
            self.readValue = self.ser.read_until()
            bytesInBuffer = self.ser.inWaiting()

    def consume(self):
        consumedValue = self.readValue
        self.readValue = None
        return consumedValue
