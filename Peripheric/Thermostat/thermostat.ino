#include <ArduinoJson.hpp>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <TemperatureController.h>
#include <HeaterController.h>
#include <GasSensorController.h>


#define DHTPIN 2 // Pin which is connected to the DHT sensor.
#define MIN_TEMPERATURE 10
#define MAX_TEMPERATURE 30
#define DHTTYPE DHT22 // DHT 22 (AM2302)

#define GAS_DETECTOR_PIN 0
#define GAS_THRESHOLD 400

#define HEATERPIN 7 // Pin that should be connected to the relay of heater
#define HEATER_PID_KP 2
#define HEATER_PID_KI 5
#define HEATER_PID_KD 1
//TODO: Use constants to define message type to expect

TemperatureController temperatureController(DHTPIN, DHTTYPE, MIN_TEMPERATURE, MAX_TEMPERATURE);
HeaterController heaterController(HEATERPIN, HEATER_PID_KP, HEATER_PID_KI, HEATER_PID_KD);
GasSensorController gasSensorController(GAS_DETECTOR_PIN, GAS_THRESHOLD);
SoftwareSerial EEBlue(10, 11); // RX | TX
void setup()
{
	pinMode(HEATERPIN, OUTPUT);

	float currentTemperature = temperatureController.getCurrentTemperature();
	heaterController.setCurrentTemperature(currentTemperature);
	heaterController.setRequestedTemperature(MIN_TEMPERATURE);
	EEBlue.begin(9600);
}

void loop()
{

	if (EEBlue.available())
	{
		StaticJsonBuffer<512> jsonBuffer;
		JsonObject &receivedJson = jsonBuffer.parse(EEBlue);
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
				heaterController.setRequestedTemperature(updateValue);
			}
			else if (updateType == "ScreenBrightness")
			{
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

	//Reevaluate heating every 5 seconds
	if (millis() % 5000 == 0)
	{
		heaterController.setCurrentTemperature(temperatureController.getCurrentTemperature());
		heaterController.compute();
	}

	if (millis() % 2000 == 0 && gasSensorController.isThresholdExceeded())
	{
			StaticJsonBuffer<512> jsonBuffer;
			JsonObject &root = jsonBuffer.createObject();
			root["messageType"] = "alert";
			root["alertType"] = "gas";
			root.printTo(EEBlue);
			EEBlue.println();
	}
}
