package application.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import application.model.Alert;
import application.model.Domicile;
import application.model.User;
import application.model.messages.AlertAddRequest;
import application.model.messages.AlertListRequest;
import application.model.messages.AlertRemoveRequest;
import application.repositories.AlertRepository;
import application.repositories.DomicileRepository;
import application.repositories.UserRepository;
import application.utilities.AuthenticationFunctions;

@RestController
public class AlertController extends JsonController {

	private static final String ALERT_LIST = "/alert/list";
	private static final String ALERT_ADD = "/alert/add";
	private static final String ALERT_REMOVE = "/alert/remove";
	
	@Autowired
	private AlertRepository alertRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DomicileRepository domicileRepository;
	
	@RequestMapping(value = ALERT_LIST, method = RequestMethod.POST, consumes = "text/plain")
	public String list(@RequestBody String payload)
	{
		Gson gson = new Gson();
		AlertListRequest request = gson.fromJson(payload, AlertListRequest.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);
		List<Alert> alerts = new ArrayList<>();

		if (AuthenticationFunctions.isTokenValid(user, token)) {
			Domicile dom = domicileRepository.findByUserId(user.getId());
			
			// All alerts that have not been read (0)
			for (Alert alert : dom.getAlerts())
			{
				if (!alert.getIsRead())
				{
					alerts.add(alert);
				}
			}
			
			return gson.toJson(alerts);
		} else {
			return getBadAuthJsonString();
		}
	}
	
	@RequestMapping(value = ALERT_ADD, method = RequestMethod.POST, consumes = "text/plain")
	public String add(@RequestBody String payload) {
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		AlertAddRequest request = gson.fromJson(payload, AlertAddRequest.class);

		Domicile dom = domicileRepository.findById(request.getDomicileId());
		String description = "";
		
		if (AuthenticationFunctions.isTokenValid(dom, request.getToken())) 
		{
			switch (request.getType())
			{
			case "gas":
				description = "Alert! Detection de gaz!";
				break;
			default:
				description = "Attention!";
				break;
			}
					
			Alert newAlert = new Alert(description);
			
			dom.addAlert(newAlert);
			alertRepository.save(newAlert);
			domicileRepository.save(dom);
		
			return "OK";
		}
		else
		{
			return getBadAuthJsonString();
		}
	}
	
	@RequestMapping(value = ALERT_REMOVE, method = RequestMethod.POST, consumes = "text/plain")
	public String remove(@RequestBody String payload) 
	{
		Gson gson = new Gson();
		AlertRemoveRequest request = gson.fromJson(payload, AlertRemoveRequest.class);
		
		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);

		if (Authenticate(token, user)) 
		{
			Iterable<Alert> alerts = alertRepository.findAll(request.getAlertIds());
			
			for (Alert alert : alerts) 
			{
				alert.setIsRead(true);
				alertRepository.save(alert);
			}
			
			return "Ok";
		} 
		else 
		{
			return getBadAuthJsonString();
		}
	}
}
