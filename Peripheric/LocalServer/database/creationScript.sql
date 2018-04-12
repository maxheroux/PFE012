CREATE TABLE peripheral(id INTEGER PRIMARY KEY, bluetoothId TEXT, name TEXT, type TEXT, rfcomm_device TEXT);
CREATE TABLE domicileConfiguration(domicile_id INTEGER PRIMARY KEY, token TEXT);