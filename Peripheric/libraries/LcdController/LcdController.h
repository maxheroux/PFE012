/*
 ControleLCD.h - Librairie pour la gestion
 de l'affichage sur LCD
 */

#ifndef LcdController_h
#define LcdController_h

#include "WString.h"

#include "Arduino.h"
#include <serLCD/serLCD.h>
#include <SoftwareSerial.h>

class LcdController {
public:
	LcdController(int pin);
	void setAskedTemperature(int askedTemperature);
	void setCurrentTemperature(int currentTemperature);
	void setHumidity(int humidity);
	void setTime(int hour, int minute);
	void changeDisplay();
	void setDailyBrightness();
	void setNightlyBrightness();
	void toggleBrightness();
	void setup();

private:
	int _askedTemperature;
	int _currentTemperature;
	int _humidity;
	serLCD lcd;
	void printHumidity(int humidity);
	void printCurrentTemperature(int temperature);
	void printAskedTemperature(int temperature);
	void printTime(int minute, int hour);
	enum DISPLAY_MODE {
		CURRENT_TEMPERATURE_MODE, HUMIDITY_MODE
	} displayMode;
	enum BRIGHTNESS_MODE {
		DAILY_MODE, NIGHTLY_MODE
	} brightnessMode;
};

#endif
