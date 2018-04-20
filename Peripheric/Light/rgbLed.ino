#include <Arduino.h>
#include <ArduinoJson.hpp>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
/*
Adafruit Arduino - Lesson 3. RGB LED
*/
SoftwareSerial EEBlue(12, 13);

int redPin = 11;
int greenPin = 10;
int bluePin = 9;

int redValue = 0;
int greenValue = 0;
int blueValue = 0;
float brightness = 0;

bool isInitialized = false;

void setup()
{
    pinMode(redPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
    pinMode(bluePin, OUTPUT);

    EEBlue.begin(9600);

    StaticJsonBuffer<512> jsonBuffer;
	JsonObject &root = jsonBuffer.createObject();
	root["initialization_request"] = "setup";
	root.printTo(EEBlue);
	EEBlue.println();
}

void loop()
{

	if (millis() % 5000 == 0 && !isInitialized)
	{

		StaticJsonBuffer<512> jsonBuffer;
		JsonObject &root = jsonBuffer.createObject();
		root["initialization_request"] = "setup";
		root.printTo(EEBlue);
		EEBlue.println();
	}

    if (EEBlue.available())
    {
        StaticJsonBuffer<512> jsonBuffer;
        JsonObject &receivedJson = jsonBuffer.parse(EEBlue);
        
        String messageType = receivedJson["messageType"];

        if (messageType == "update")
        {
            redValue = receivedJson["red"];
            greenValue = receivedJson["green"];
            blueValue = receivedJson["blue"];
            brightness = receivedJson["brightness"];
            isInitialized = true;
            setColor((int)redValue*brightness, (int)greenValue*brightness, (int)blueValue*brightness);
        }
        else if (isInitialized && messageType == "read")
        {

            JsonObject &root = jsonBuffer.createObject();
            root["red"] = redValue;
            root["green"] = greenValue;
            root["blue"] = blueValue;
            root["brightness"] = brightness;
		
			root.printTo(EEBlue);
			EEBlue.println();
        }
    }
}

void setColor(int red, int green, int blue)
{
    analogWrite(redPin, red);
    analogWrite(greenPin, green);
    analogWrite(bluePin, blue);
}
