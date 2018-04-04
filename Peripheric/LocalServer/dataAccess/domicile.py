import sqlite3
from models.domicile import Domicile

class DomicileConfigurationDAO:

    def __init__(self):
        self.conn = sqlite3.connect('database/data.db')

    def save_domicile_configuration(self, domicile):
        cursor = self.conn.cursor()
        cursor.execute("""delete from domicileConfiguration""")
        self.conn.commit()
        cursor.execute("""
        INSERT INTO domicileConfiguration(domicile_id, token) VALUES(?, ?)""",
                       (domicile.domicileId, domicile.token))
        self.conn.commit()

    def get_domicile_configuration(self):
        cursor = self.conn.cursor()
        cursor.execute("""SELECT * FROM domicileConfiguration""")
        response = cursor.fetchone()

        return Domicile(response[0], response[1])
