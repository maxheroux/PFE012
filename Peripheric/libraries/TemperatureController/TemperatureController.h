/*
 TemperatureController.h - Librairie pour la gestion
 de la temperature
 */

#ifndef TemperatureController_h
#define TemperatureController_h

#include <DHT.h>
#include <DHT_U.h>

class TemperatureController
{
  public:
	TemperatureController(uint8_t sensorPin, uint8_t dhtType, int min,
						  int max);
	int getRequestedTemperature();
	float getCurrentTemperature();
	float getHumidity();
	void checkTemperature();
	void checkHumidity();
	void raiseTemperature();
	void reduceTemperature();
	void setRequestedTemperature(int temperature);
	enum UPDATE_TYPE
	{
		ASKED_TEMPERATURE_BLUETOOTH,
		ASKED_TEMPERATURE_SERVER,
		CURRENT_TEMPERATURE,
		CURRENT_HUMIDITY
	};

  private:
	int _requestedTemperature;
	float _currentTemperature;
	float _humidity;
	int _min;
	int _max;
	DHT_Unified dht;
	// HeaterController heaterController;
};

#endif
