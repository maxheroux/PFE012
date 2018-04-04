
#ifndef GasSensorController_h
#define GasSensorController_h

#include <Arduino.h>

class GasSensorController
{
  public:
	GasSensorController(int sensorPin, int threshold);
	bool isThresholdExceeded();

  private:
	int sensorPin;
	int sensorThreshold;
};

#endif