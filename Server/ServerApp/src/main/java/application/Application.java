package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.gson.Gson;

import application.message.StateChange;
import application.message.StateRequest;


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
		
		StateChange change = new StateChange(1, "julien", "requestedTemperature", 22, "asdasddas");
		
		System.out.println(gson.toJson(change, StateChange.class).toString());
	}
}
