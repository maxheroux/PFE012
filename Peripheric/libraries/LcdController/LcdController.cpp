#include <LcdController/LcdController.h>
#include "Arduino.h"

#include "WString.h"
#include <SoftwareSerial.h>
#include <serLCD/serLCD.h>

#define defaultDailyBrightness 30
#define defaultNightlyBrightness 10

LcdController::LcdController(int pin)
	: lcd(serLCD(pin))
{
	_askedTemperature = 0;
	_currentTemperature = 0;
	_humidity = 0;
	brightnessMode = NIGHTLY_MODE;
	displayMode = CURRENT_TEMPERATURE_MODE;
}

void LcdController::setup() {
	lcd.clear();
}


void LcdController::setDailyBrightness() {
	lcd.setBrightness(defaultDailyBrightness);
	brightnessMode = DAILY_MODE;
}

void LcdController::setNightlyBrightness() {
	lcd.setBrightness(defaultNightlyBrightness);
	brightnessMode = NIGHTLY_MODE;
}

void LcdController::toggleBrightness() {
	if (brightnessMode == DAILY_MODE) {
		setNightlyBrightness();
	}
	else {
		setDailyBrightness();
	}
}

void LcdController::printHumidity(int humidity) {

	lcd.selectLine(2);
	lcd.print("HU:");
	lcd.print(humidity);
}

void LcdController::printCurrentTemperature(int temperature) {
	lcd.selectLine(2);
	lcd.print("      ");
	lcd.selectLine(2);
	lcd.print(temperature);
	lcd.print(" C");

}

void LcdController::printAskedTemperature(int temperature) {
	lcd.selectLine(1);
	lcd.print("      ");
	lcd.selectLine(1);
	lcd.print(temperature);
	lcd.print(" C");
}

void LcdController::printTime(int minute, int hour) {
	String hourAdjustment = "";
	String separator = ":";
	int cursor = 12;

	if (minute < 10)
		separator += "0";
	if (hour < 10) {
		hourAdjustment = " ";
	}
	lcd.setCursor(1, cursor);
	lcd.print(hourAdjustment + hour + separator + minute);
}


void LcdController::setAskedTemperature(int askedTemperature)
{
	_askedTemperature = askedTemperature;
	printAskedTemperature(askedTemperature);
}

void LcdController::setCurrentTemperature(int currentTemperature)
{
	_currentTemperature = currentTemperature;
	printCurrentTemperature(currentTemperature);

}

void LcdController::setHumidity(int humidity)
{
	_humidity = humidity;
	if (displayMode == HUMIDITY_MODE)
	{
		printHumidity(humidity);
	}
}

void LcdController::setTime(int minute, int hour)
{
	printTime(minute, hour);
}

void LcdController::changeDisplay()
{
	if (displayMode == CURRENT_TEMPERATURE_MODE)
	{
		printHumidity(_humidity);
		displayMode = HUMIDITY_MODE;
	}
	else
	{
		printCurrentTemperature(_currentTemperature);
		displayMode = CURRENT_TEMPERATURE_MODE;
	}
}

