#include "GasSensorController.h"

GasSensorController::GasSensorController(int sensorPin, int threshold)
{
	this->sensorPin = sensorPin;
	sensorThreshold = threshold;
}

bool GasSensorController::isThresholdExceeded()
{
	int val = analogRead(sensorPin);
	return val >= sensorThreshold;
}