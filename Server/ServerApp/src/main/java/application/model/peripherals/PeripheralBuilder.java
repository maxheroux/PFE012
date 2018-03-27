package application.model.peripherals;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.persistence.DiscriminatorValue;

public class PeripheralBuilder {

	private static final List<Class<? extends State>> statesTypes = Collections.unmodifiableList(Arrays.asList(
			Thermostat.class, RFIDReader.class, MotionDetector.class, Lock.class, Light.class, CODetector.class));

	private String type;
	private String bluetoothId;
	private String name;

	public PeripheralBuilder(String type, String bluetoothId, String name) {
		super();
		this.type = type;
		this.bluetoothId = bluetoothId;
		this.name = name;
	}

	public Peripheral build() {
		Peripheral newPeripheral = new Peripheral(bluetoothId, name);
		newPeripheral.setCurrentState(new Light(false, 11));
		newPeripheral.setCurrentState(getConcreteState(type));
		return newPeripheral;
	}


	private State getConcreteState(String type) {
		for (Class<?> classType : statesTypes) {
			DiscriminatorValue anno = (DiscriminatorValue) classType.getAnnotation(DiscriminatorValue.class);
			if (anno.value().equals(type)) {
				try {
					return (State) classType.getConstructor().newInstance();
				} catch (InstantiationException | IllegalAccessException | IllegalArgumentException
						| InvocationTargetException | NoSuchMethodException | SecurityException e) {

					return null;
				}
			}
		}
		return null;
	}
}
