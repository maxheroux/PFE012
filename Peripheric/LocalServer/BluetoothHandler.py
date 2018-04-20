
import serial
import threading
import time
from Queue import Queue
from Queue import Empty as Empty_queue

class BluetoothHandler(object):


    def __init__(self, device_id, port):
        self.device_id = device_id
        self.port = port
        self.reading_queue = Queue()
        self.writing_queue = Queue()
        self.connection_manager = ConnectionManager(port, self.writing_queue, self.reading_queue)
        self.connection_manager.start()

    def send(self, message):
        self.writing_queue.put(message)

    def read(self):

        try:
            message = self.reading_queue.get(block=False)
        except Empty_queue as empty_exception:
            return None
        return message

class Reader(threading.Thread):

    def __init__(self, ser, message_queue, exception_queue):
        super(Reader, self).__init__()
        self.ser = ser
        self.message_queue = message_queue
        self.exception_queue = exception_queue
        self.semaphore = threading.Semaphore()
        self.is_connection_valid = True
        self.setDaemon(True)

    def run(self):


        while True:

            if self.is_connection_valid:
                try:
                    self.semaphore.acquire()
                    if self.ser.inWaiting() > 0:
                        self.message_queue.put(self.ser.read_until())
                    self.semaphore.release()
                except IOError as ex:
                    self.exception_queue.put(ex)
                    self.semaphore.release()
                    time.sleep(0.5)
                except Exception as ex:
                    self.exception_queue.put(ex)
                    self.semaphore.release()
                    time.sleep(0.5)
            time.sleep(1)

    def set_connection_valid(self, is_valid):
        self.semaphore.acquire()
        self.is_connection_valid = is_valid
        self.semaphore.release()

    def set_serial(self, ser):
        self.ser = ser


class Writer(threading.Thread):

    def __init__(self, ser, message_queue, exception_queue):
        super(Writer, self).__init__()
        self.ser = ser
        self.message_queue = message_queue
        self.exception_queue = exception_queue
        self.semaphore = threading.Semaphore()
        self.setDaemon(True)
        self.is_connection_valid = True

    def run(self):

        while True:
            if self.is_connection_valid:
                try:
                    self.semaphore.acquire()
                    self.ser.writelines(self.message_queue.get(timeout=1))
                    self.semaphore.release()
                except Empty_queue:
                    self.semaphore.release()
                    pass
                except IOError as ex:
                    self.exception_queue.put(ex)
                    self.semaphore.release()
                    time.sleep(0.5)
                except Exception as ex:
                    self.exception_queue.put(ex)
                    self.semaphore.release()
                    time.sleep(0.5)
            time.sleep(1)

    def set_connection_valid(self, is_valid):
        self.semaphore.acquire()
        self.is_connection_valid = is_valid
        self.semaphore.release()

    def set_serial(self, ser):
        self.ser = ser


class ConnectionManager(threading.Thread):

    def __init__(self, port, writer_queue, reader_queue):
        super(ConnectionManager, self).__init__()
        self.port = port
        self.exception_queue = Queue()
        self.connect()
        self.writer = Writer(self.ser, writer_queue, self.exception_queue)
        self.reader = Reader(self.ser, reader_queue, self.exception_queue)
        self.ser = serial.Serial(self.port, timeout=1, write_timeout=2)
        self.setDaemon(True)

    def run(self):

        while not self.is_connected():
            self.connect()
            time.sleep(0.5)

        self.writer.start()
        self.reader.start()

        while True:
            exception = self.exception_queue.get()
            self.reader.set_connection_valid(False)
            self.writer.set_connection_valid(False)
            while not self.is_connected():
                self.connect()
                time.sleep(1)
            self.reader.set_serial(self.ser)
            self.writer.set_serial(self.ser)
            self.reader.set_connection_valid(True)
            self.writer.set_connection_valid(True)

    def is_connected(self):

        try:
            # Send dumb messages, if connection isn't valid, an exception is thrown
            self.ser.writelines("test")
            self.ser.writelines("test")
            self.ser.writelines("test")
            return True
        except Exception as e:
            return False


    def connect(self):

        print("Try connecting bluetooth on port " + self.port)
        self.ser = serial.Serial(self.port, timeout=1, write_timeout=2)

        if self.is_connected():
            print("Connection successfully established")
        else:
            print("Connection failed - Device not found")
