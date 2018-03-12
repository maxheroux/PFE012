package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.gson.Gson;

import application.message.StateChange;
import application.message.StateRequest;

import java.util.Map;
import java.util.HashMap;

@SpringBootApplication
public class Application
{
	public static void main(String[] args) 
	{
		SpringApplication.run(Application.class, args);
		
		StateRequest req = new StateRequest(1,"julien","2f58261f-a0f2-403f-9d7a-ccf202a962a7");
		
		Gson gson = new Gson();
		
		gson.toJson(req, StateRequest.class);
		
		System.out.println(gson.toJson(req, StateRequest.class).toString());
		Map<String,String> value = new HashMap<>();
		value.put("RequestedTemperature", "22");		
		StateChange change = new StateChange(1, "julien", "requestedTemperature", value, "asdasddas");
		
		System.out.println(gson.toJson(change, StateChange.class).toString());
	}
}
