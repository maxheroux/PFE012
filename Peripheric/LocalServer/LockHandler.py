import json
from dataAccess.rfidTag import RfidTag_DAO
from perpetualTimer import PerpetualTimer
from BluetoothHandler import BluetoothHandler

class LockHandler:
    def __init__(self, device_id, port):
        self.device_id = device_id
        self.port = port
        self.periodic_poll_delay = 0.5
        self.request_poll_delay = 2
        self.bluetooth_handler = BluetoothHandler(device_id, port)
        self.request_timer = PerpetualTimer(self.request_poll_delay, self.request_data)
        self.reader_timer = PerpetualTimer(self.periodic_poll_delay, self.read)
        self.request_timer.start()
        self.reader_timer.start()
        self.locked = True


    def send_response(self, tag_id, is_request_accepted):
        message = json.dumps(
            {"messageType": "tagResponse", "tagRead": tag_id, "accepted": is_request_accepted})
        self.bluetooth_handler.send(message)

    def get_data(self):
        return json.dumps(
            {"deviceId": self.device_id, "isLocked": self.locked})


    def change_state(self, state_value):
        if "isLocked" in state_value:

            self.locked = state_value["isLocked"]
            self.bluetooth_handler.send(json.dumps(
                {"messageType": "update", "updateType": "lock", "updateValue": self.locked}))


    def request_data(self):
        self.bluetooth_handler.send(json.dumps(
            {"messageType": "read"}))


    def read(self):

            message = self.bluetooth_handler.read()
            if message != None:
                message = json.loads(message)
                if "tagId" in message:
                    tagId = message["tagId"]
                    accepted = tagId in RfidTag_DAO().get_tags()
                    self.send_response(tagId, accepted)
                elif "isLocked" in message:
                    self.locked = message["isLocked"]
                elif "initialization_request" in message:
                    self.bluetooth_handler.send(json.dumps(
                        {"messageType": "update", "updateType": "lock", "updateValue": self.locked}))
