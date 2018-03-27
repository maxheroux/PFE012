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
	}
}
