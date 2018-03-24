
class Peripheral(object):



    def __init__(self, id = 0, bluetooth_id = "", name = "", type = "", rfcomm_device = ""):
        self.id = id
        self.bluetooth_id = str(bluetooth_id)
        self.name = str(name)
        self.type = str(type)
        self.rfcomm_device = str(rfcomm_device)

    @staticmethod
    def peripheral_object_hook(d):
        peripheral = Peripheral(d["id"], d["bluetoothId"], d["name"], d["type"], "")
        return peripheral
