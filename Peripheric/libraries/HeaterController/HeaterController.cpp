#include "Arduino.h"
#include <PID_v1/PID_v1.h>
#include <SoftwareSerial.h>
#include "HeaterController.h"

HeaterController::HeaterController(int pin, double kp, double ki, double kd) :
pid(&input, &output, &setpoint, kp, ki, kd, DIRECT) {
	this->pin = pin;
	windowStartTime = millis();
	this->kp = kp;
	this->ki = ki;
	this->kd = kd;
	pid.SetOutputLimits(0, 10);
	pid.SetMode(AUTOMATIC);

}

void HeaterController::setActualTemperature(double temperature) {
	this->input = temperature;
}

void HeaterController::setRequiredTemperature(double temperature) {
	this->setpoint = temperature;
}

void HeaterController::start() {
	digitalWrite(pin, LOW);
}

void HeaterController::stop() {
	digitalWrite(pin, HIGH);
}

bool HeaterController::isHeaterOn() {
	return isHeating;
}

void HeaterController::compute() {
	pid.Compute();

	if (millis() - windowStartTime > windowSize) {
		windowStartTime += windowSize;
	}

	if (output > 0.5)
	{
		this->start();
	}
	else{
		this->stop();
	}
}
