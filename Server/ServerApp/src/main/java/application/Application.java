package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import application.message.StateRequest;


@SpringBootApplication
public class Application
{
	public static void main(String[] args) 
	{
		SpringApplication.run(Application.class, args);
		
		StateRequest req = new StateRequest(1, "toto", "asdasd");
	}
}
