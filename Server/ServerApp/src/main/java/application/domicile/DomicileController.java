package application.domicile;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import application.message.Message;
import application.utilities.AuthenticationFunctions;
import application.utilities.HashingFunctions;

@RestController
public class DomicileController 
{	
	@Autowired
	private DomicileRepository domicileRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	/*
	@RequestMapping("/connection")
	public Message connection(@RequestParam(value="username", required = true) String username
		, @RequestParam(value="password", required = true) String password)
	{
		Domicile user = (Domicile) entityManager.createQuery("from User where username = :username")
				.setParameter("username", username)
				.getSingleResult();
		
		String salt = user.getSalt();
		String cryptedPassword = HashingFunctions.hashPassword(password, salt);
		
		if (user.getPassword().equals(cryptedPassword))
		{
			// Generate new token
			String token = AuthenticationFunctions.generateToken();
			user.setToken(token);
			domicileRepository.save(user);
			
			return new Message("Token", token);
		}
		else
		{
			return new Message("Token", "BAD_AUTHENTICATION");
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
		Domicile user = new Domicile(username, cryptedPassword, salt, publicIp, port);
		user.setToken(token);
		domicileRepository.save(user);
		
		return new Message("Token", user.getToken());
	}
	*/
}