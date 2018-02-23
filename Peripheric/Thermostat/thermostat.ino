#include <ArduinoJson.hpp>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <TemperatureController.h>

#define DHTPIN 2 // Pin which is connected to the DHT sensor.
#define MIN_TEMPERATURE 10
#define MAX_TEMPERATURE 30
#define DHTTYPE DHT22 // DHT 22 (AM2302)

//TODO: Use constants to define message type to expect

TemperatureController temperatureController(DHTPIN, DHTTYPE, MIN_TEMPERATURE, MAX_TEMPERATURE);
SoftwareSerial EEBlue(10, 11); // RX | TX
void setup()
{
	Serial.begin(9600);
	EEBlue.begin(9600);
}

void loop()
{

	if (EEBlue.available())
	{
		StaticJsonBuffer<512> jsonBuffer;
		JsonObject &receivedJson = jsonBuffer.parse(EEBlue);
		receivedJson.prettyPrintTo(Serial);
		String messageType = receivedJson["messageType"];

		if (messageType == "update")
		{

			JsonObject &root = jsonBuffer.createObject();
			String updateType = receivedJson["updateType"];
			int updateValue = receivedJson["updateValue"];

			if (updateType == "RequestedTemperature")
			{
				int updateValue = receivedJson["updateValue"];

				temperatureController.setRequestedTemperature(updateValue);
				Serial.println("Requested Temperature: " + String(temperatureController.getRequestedTemperature()));
			}
			else if (updateType == "ScreenBrightness"){
				
			}

			root["state"] = "OK";
			root.printTo(EEBlue);
			EEBlue.println();
		}
		else if (messageType == "read")
		{
			JsonObject &root = jsonBuffer.createObject();

			root["Humidity"] = temperatureController.getHumidity();
			root["CurrentTemperature"] = temperatureController.getCurrentTemperature();
			root["RequestedTemperature"] = temperatureController.getRequestedTemperature();
			
			root.printTo(EEBlue);
			EEBlue.println();
		}
	}

	if (Serial.available())
	{
		StaticJsonBuffer<512> jsonBuffer;
		JsonObject &root = jsonBuffer.createObject();
		Serial.println("Sending " + Serial.readString());

		root["Temperature"] = temperatureController.getCurrentTemperature();
		root["Humidity"] = temperatureController.getHumidity();

		root.printTo(EEBlue);
	}
}
