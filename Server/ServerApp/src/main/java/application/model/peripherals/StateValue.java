package application.model.peripherals;

import java.util.Map;

public interface StateValue {

	void setStateValue(String field, String value);
	Map<String,String> getStateValues();

}