package application.model.peripherals;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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
		newPeripheral.setCurrentState(new Light(false, true, 11, 22));
		newPeripheral.setCurrentState(getConcretState(type));
		return newPeripheral;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private State getConcretState(String type) {
		for (Class classType : statesTypes) {
			for (Annotation annotation : classType.getAnnotations()) {

				Class<? extends Annotation> annotationType = annotation.annotationType();

				if (annotationType.equals(javax.persistence.DiscriminatorValue.class)) {
					for (Method method : annotationType.getDeclaredMethods()) {
						Object value = null;

						try {
							value = method.invoke(annotation, (Object[]) null);
						} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
						}

						String valueString = (String) value;

						if (valueString.equals(type)) {
							try {
								return (State) classType.getConstructor().newInstance();
							} catch (InstantiationException | IllegalAccessException | IllegalArgumentException
									| InvocationTargetException | NoSuchMethodException | SecurityException e) {

								return null;
							}
						}
					}
				}
			}
		}
		return null;
	}
}
