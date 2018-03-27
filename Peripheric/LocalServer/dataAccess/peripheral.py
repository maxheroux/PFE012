import sqlite3
from models.peripheral import Peripheral


class Peripheral_DAO:

    def __init__(self):
        self.conn = sqlite3.connect('database/data.db')

    def add_peripheral(self, peripheral, rfcomm_device):
        cursor = self.conn.cursor()
        cursor.execute("""
        INSERT INTO peripheral(id, bluetoothId, name, type, rfcomm_device) VALUES(?, ?, ?, ?, ?)""",
                       (peripheral.id, peripheral.bluetooth_id, peripheral.name, peripheral.type, rfcomm_device))
        self.conn.commit()

    def get_peripherals(self):
        cursor = self.conn.cursor()
        cursor.execute("""SELECT * FROM peripheral""")
        rows = cursor.fetchall()
        peripherals = []

        for row in rows:
            peripherals.append(Peripheral(row[0], row[1], row[2], row[3], row[4]))

        return peripherals


    def get_peripheral(self, peripheral_id):
        cursor = self.conn.cursor()
        cursor.execute("""SELECT * FROM peripheral WHERE id=?""", (peripheral_id,))
        response = cursor.fetchone()
        return Peripheral(response[0], response[1], response[2], response[3], response[4])