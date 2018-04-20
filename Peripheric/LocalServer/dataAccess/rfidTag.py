import sqlite3
from models.peripheral import Peripheral


class RfidTag_DAO:

    def __init__(self):
        self.conn = sqlite3.connect('database/data.db')

    def add_tag(self, tagId):
        cursor = self.conn.cursor()
        cursor.execute("""INSERT INTO rfidTag(tagId) VALUES(?)""", (tagId,))
        self.conn.commit()

    def get_tags(self):
        cursor = self.conn.cursor()
        cursor.execute("""SELECT * FROM rfidTag""")
        rows = cursor.fetchall()
        tags = []

        for row in rows:
            tags.append(row[1])

        return tags

    def delete_tag(self, tag_id):
        cursor = self.conn.cursor()
        cursor.execute("""DELETE FROM rfidTag WHERE tagId=?""", (tag_id,))
