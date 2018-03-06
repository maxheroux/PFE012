#include "Arduino.h"
#include <PID_v1.h>
#include <SoftwareSerial.h>
#include "HeaterController.h"

HeaterController::HeaterController(int pin, double kp, double ki, double kd) : pid(&input, &output, &setpoint, kp, ki, kd, DIRECT)
{
	this->pin = pin;
	windowStartTime = millis();
	this->kp = kp;
	this->ki = ki;
	this->kd = kd;
	pid.SetMode(AUTOMATIC);
	pid.SetOutputLimits(0, 10);
}

void HeaterController::setCurrentTemperature(double temperature)
{
	this->input = temperature;
}

void HeaterController::setRequestedTemperature(double temperature)
{
	this->setpoint = temperature;
}

void HeaterController::start()
{
	if (isHeating)
		return;
	isHeating = true;
	digitalWrite(pin, HIGH);
}

void HeaterController::stop()
{
	if (!isHeating)
		return;
	isHeating = false;
	digitalWrite(pin, LOW);
}

bool HeaterController::isHeaterOn()
{
	return isHeating;
}

void HeaterController::compute()
{

	pid.Compute();
	if (millis() - windowStartTime > windowSize)
	{
		windowStartTime += windowSize;
	}
	if (output > 1)
	{

		this->start();
	}
	else
	{
		this->stop();
	}
}
