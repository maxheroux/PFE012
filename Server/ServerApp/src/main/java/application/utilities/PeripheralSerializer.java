package application.utilities;

import java.lang.reflect.Type;

import javax.persistence.DiscriminatorValue;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import application.model.peripherals.Peripheral;

public class PeripheralSerializer implements JsonSerializer<Peripheral> {

	@Override
	public JsonElement serialize(Peripheral src, Type typeOfSrc, JsonSerializationContext context) {
		JsonObject root = new JsonObject();
        root.addProperty("id", src.getId());
        root.addProperty("bluetoothId", src.getBluetoothId());
        root.addProperty("name", src.getName());
        DiscriminatorValue anno = src.getCurrentState().getClass().getAnnotation(DiscriminatorValue.class);
        root.addProperty("type", anno.value());
        return root;
	}

}
