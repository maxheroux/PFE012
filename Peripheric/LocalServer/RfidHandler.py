import json
from dataAccess.rfidTag import RfidTag_DAO
from perpetualTimer import PerpetualTimer
from BluetoothHandler import BluetoothHandler

class RfidHandler:
    def __init__(self, device_id, port):
        self.device_id = device_id
        self.port = port
        self.periodic_poll_delay = 0.5
        self.bluetooth_handler = BluetoothHandler(device_id, port)
        self.reader_timer = PerpetualTimer(self.periodic_poll_delay, self.read_scan)
        self.reader_timer.start()


    def send_response(self, tag_id, is_request_accepted):
        message = json.dumps(
            {"tagRead": tag_id, "accepted": is_request_accepted})
        self.bluetooth_handler.send(message)

    def get_data(self):
        #TODO: Keep/change state of lock and return real state
        return json.dumps(
            {"deviceId": self.device_id, "currentLock": "False"})

    def read_scan(self):

            message = self.bluetooth_handler.read()
            if message != None:
                message = json.loads(message)
                if "tagId" in message:
                    tagId = message["tagId"]
                    accepted = tagId in RfidTag_DAO().get_tags()
                    self.send_response(tagId, accepted)
