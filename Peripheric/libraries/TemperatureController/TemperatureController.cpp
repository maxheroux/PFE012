#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#include "TemperatureController.h"

TemperatureController::TemperatureController(uint8_t sensorPin, uint8_t dhtType, int min,
											 int max) : dht(sensorPin, dhtType)
{
	// pinMode(heaterPin, INPUT);
	_min = min;
	_max = max;
	// dht(sensorPin, dhtType);
	// heaterController(heaterPin, 2, 5, 1);
	// heaterController.setActualTemperature(_currentTemperature);
	// heaterController.setRequestedTemperature(_requestedTemperature);
}

float TemperatureController::getCurrentTemperature()
{
	sensors_event_t event;
	dht.temperature().getEvent(&event);
	return event.temperature;
}

float TemperatureController::getHumidity()
{

	sensors_event_t event;
	dht.humidity().getEvent(&event);
	return event.relative_humidity;
}

void TemperatureController::setRequestedTemperature(int temperature)
{

	if (_max > temperature && temperature > _min)
	{
		_requestedTemperature = temperature;
	}
	else if (temperature >= _max)
	{
		_requestedTemperature = _max;
	}
	else
	{
		_requestedTemperature = _min;
	}
	// heaterController.setRequestedTemperature(_requestedTemperature);
}

int TemperatureController::getRequestedTemperature()
{
	return _requestedTemperature;
}

void TemperatureController::raiseTemperature()
{

	setRequestedTemperature(_requestedTemperature + 1);
	// heaterController.setRequestedTemperature(_requestedTemperature);
}

void TemperatureController::reduceTemperature()
{
	setRequestedTemperature(_requestedTemperature - 1);
	// heaterController.setRequestedTemperature(_requestedTemperature);
}

void TemperatureController::checkTemperature()
{
	_currentTemperature = getCurrentTemperature();

	// heaterController.setActualTemperature(_currentTemperature);
	// heaterController.compute();
}

void TemperatureController::checkHumidity()
{

	_humidity = getHumidity();
}
