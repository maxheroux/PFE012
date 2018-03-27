package application.controller;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import application.model.Domicile;
import application.model.User;
import application.model.messages.Message;
import application.model.peripherals.Light;
import application.model.peripherals.Peripheral;
import application.model.peripherals.Thermostat;
import application.repositories.DomicileRepository;
import application.repositories.UserRepository;
import application.utilities.AuthenticationFunctions;
import application.utilities.HashingFunctions;

@RestController
public class UserController 
{	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DomicileRepository domicileRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@RequestMapping("/connection")
	public Message connection(@RequestParam(value="username", required = true) String username
		, @RequestParam(value="password", required = true) String password)
	{
		User user = (User) entityManager.createQuery("from User where username = :username")
				.setParameter("username", username)
				.getSingleResult();
		
		String salt = user.getSalt();
		String cryptedPassword = HashingFunctions.hashPassword(password, salt);
		
		if (user.getPassword().equals(cryptedPassword))
		{
			// Generate new token
			String token = AuthenticationFunctions.generateToken();
			user.setToken(token);
			userRepository.save(user);
			
			return new Message(token);
		}
		else
		{
			return new Message("BAD_AUTHENTICATION");
		}
	}
	
	@RequestMapping("/register")
	public Message register(@RequestParam(value="username", required = true) String username
		, @RequestParam(value="password", required = true) String password
		, @RequestParam(value="publicIp", required = true) String publicIp
		, @RequestParam(value="port", required = true) int port)
	{
		String salt = HashingFunctions.generateSalt();
		String cryptedPassword = HashingFunctions.hashPassword(password, salt);
		
		// Generate token
		String token = AuthenticationFunctions.generateToken();
		
		// Store info in database
		User user = new User(username, cryptedPassword, salt, publicIp, port);
		
		Domicile dom = new Domicile(123123,username+" Domicile", "Rue "+username, 12, "H1H1H1", "Montreal", "QQ", "Ca", username+"domo",
				"domodomo", "asd");
		dom.addUser(user);

		user.setToken(token);
		userRepository.save(user);
		dom = domicileRepository.save(dom);
		
		return new Message( user.getToken());
	}
}