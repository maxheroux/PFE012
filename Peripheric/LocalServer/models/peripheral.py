
class Peripheral(object):
    id = 0
    bluetoothId = ""
    name = ""

    # This function receives peripheral literal value and returns the peripheral as an object
    def peripheral_object_hook(self, d):
        peripheral = Peripheral()
        peripheral.__dict__.update(d)
        return peripheral
