
class Peripheral(object):


    def __init__(self, id = 0, bluetooth_id = "", name = "", type = "", rfcomm_device = ""):
        self.id = id
        self.bluetooth_id = str(bluetooth_id)
        self.name = str(name)
        self.type = str(type)
        self.rfcomm_device = str(rfcomm_device)

    @staticmethod
    def peripheral_object_hook(d):
        peripherals = []
        for peripheral in d:
            print(peripheral)
            peripheral = Peripheral(peripheral["id"], peripheral["bluetoothId"], peripheral["name"], peripheral["type"], "")
            peripherals.append(peripheral)
        return peripherals
