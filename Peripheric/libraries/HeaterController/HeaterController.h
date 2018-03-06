/*
 HeaterController.h - Librairie pour la gestion
 de chauffage
 */

#ifndef HeaterController_h
#define HeaterController_h

#include <PID_v1.h>

class HeaterController {
public:
	HeaterController(int pin, double kp, double ki, double kd);
	void setRequestedTemperature(double temperature);
	void setCurrentTemperature(double temperature);
	void start();
	void stop();
	bool isHeaterOn();
	void compute();

private:
	int pin;
	double kp, ki, kd;
	double setpoint, input = 0, output = 0;
	int windowSize;
	unsigned long windowStartTime;
	bool isHeating = false;
	PID pid;
};

#endif
