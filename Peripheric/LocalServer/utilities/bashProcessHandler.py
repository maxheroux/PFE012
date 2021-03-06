import subprocess
from dataAccess.peripheral import Peripheral_DAO

class PeripheralCreationProcess:

    @staticmethod
    def bind_peripherals():
        subprocess.check_output(["utilities/rfcommReleaseScript"])
        peripherals = Peripheral_DAO().get_peripherals()
        for peripheral in peripherals:
            rfcomm_channel = peripheral.rfcomm_device.replace('/dev/rfcomm', '')
            subprocess.check_output(["utilities/rfcommBindScript", rfcomm_channel, peripheral.bluetooth_id])

    @staticmethod
    def create_peripheral(bluetooth_id):

        #TODO: Execute script on another thread

        new_rfcomm_channel = 0
        found_available_channel = False
        while not found_available_channel:

            if not PeripheralCreationProcess.rfcomm_exists(new_rfcomm_channel):
                found_available_channel = True
                print("RFCOMM Channel for {} is {}".format(bluetooth_id, new_rfcomm_channel))
            else:
                new_rfcomm_channel += 1

        creation_successful = subprocess.check_output(

            ["utilities/peripheralCreationScript.sh", bluetooth_id, str(new_rfcomm_channel)])

        print(creation_successful)
        if "True" in str(creation_successful):

            print("Creation of {} successful with /dev/rfcomm{}".format(bluetooth_id, new_rfcomm_channel))
            return "/dev/rfcomm{}".format(new_rfcomm_channel)


    @staticmethod
    def rfcomm_exists(channel):

        exists = subprocess.check_output(["utilities/rfcommValidatorScript", "/dev/rfcomm{}".format(channel)])


        if "True" in str(exists):
            return True
        elif "False" in str(exists):
            return False

        return None
