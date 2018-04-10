from _curses import baudrate

import serial
import threading
import time
import json
from perpetualTimer import PerpetualTimer
from BluetoothHandler import BluetoothHandler

# TODO: Send something to server if a device isn't found, to let it know that it cannot be used
class LightHandler:
    def __init__(self, device_id, port):
        self.device_id = device_id
        self.port = port
        self.periodic_poll_delay = 10
        self.color = {"r": 0, "g":0, "b":0}
        self.brightness = 0
        self.bluetooth_handler = BluetoothHandler(device_id, port)
        self.request_timer = PerpetualTimer(self.periodic_poll_delay, self.request_light_state)
        self.reader_timer = PerpetualTimer(self.periodic_poll_delay, self.read_light_state)
        self.request_timer.start()
        self.reader_timer.start()

    def get_data(self):
        return json.dumps({"deviceId": self.device_id,"color": {"r":self.color["r"],"g":self.color["g"],"b":self.color["b"]}, "brightness": self.brightness})

    # state_value format: {"color":{"r":0, "g":0, "b":0}, "brightness":0.5}
    def change_state(self, state_value):
        hexColor = state_value["color"]
        self.color["r"] = int(hexColor[0:2],16)
        self.color["g"] = int(hexColor[2:4],16)
        self.color["b"] = int(hexColor[4:6],16)
        print(self.color)
        # self.brightness = state_value["brightness"]
        self.brightness = 0.5
        message = json.dumps(
            {"messageType":"update","red": self.color["r"], "green": self.color["g"], "blue": self.color["b"], "brightness":self.brightness})
        self.bluetooth_handler.send(message)

    def request_light_state(self):
        self.bluetooth_handler.send(json.dumps(
            {"messageType": "read"}))

    def read_light_state(self):

            message = self.bluetooth_handler.read()
            if message != None:
                message = json.loads(message)
                # TODO: Maybe find a way to identify message another way
                if "red" in message:
                    x = 0#TODO: Update fields (color, brightness) from received message

#               TODO: Handle light closed by "toggle"Button

