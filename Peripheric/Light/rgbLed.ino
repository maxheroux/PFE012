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

//uncomment this line if using a Common Anode LED
// #define COMMON_ANODE

void setup()
{
    pinMode(redPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
    pinMode(bluePin, OUTPUT);

    Serial.begin(9600);
    EEBlue.begin(9600);
}

void loop()
{

    if (EEBlue.available())
    {
        Serial.println("Received something");
        StaticJsonBuffer<512> jsonBuffer;
        JsonObject &receivedJson = jsonBuffer.parse(EEBlue);
        receivedJson.prettyPrintTo(Serial);
        
        String messageType = receivedJson["messageType"];

        if (messageType == "power")
        {
            int lightState = receivedJson["lightState"];

            if (lightState > 0)
            {
                turnOn();
            }
            else
            {
                turnOff();
            }
        }
        else if (messageType == "color")
        {
            int red = receivedJson["red"];
            int green = receivedJson["green"];
            int blue = receivedJson["blue"];
            float brightness = receivedJson["brightness"];

            setColor(red, green, blue, brightness);
        }
    }
}

void setColor(int red, int green, int blue, float brightness)
{
    // Keep color in volatile memory
    redValue = red*brightness;
    greenValue = green*brightness;
    blueValue = blue*brightness;

    analogWrite(redPin, redValue);
    analogWrite(greenPin, greenValue);
    analogWrite(bluePin, blueValue);
}

void turnOn()
{

    analogWrite(redPin, redValue);
    analogWrite(greenPin, greenValue);
    analogWrite(bluePin, blueValue);
}

void turnOff()
{

    analogWrite(redPin, 0);
    analogWrite(greenPin, 0);
    analogWrite(bluePin, 0);
}