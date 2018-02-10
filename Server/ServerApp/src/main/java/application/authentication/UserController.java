package application.authentication;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import application.utilities.HashingFunctions;

@RestController
public class UserController 
{	
	@Autowired
	private UserRepository userRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@RequestMapping("/connection")
	public Token connection(@RequestParam(value="username", required = true) String username
		, @RequestParam(value="password", required = true) String password)
	{
		// TODO: Check if token is valid, else generate new token
		
		User user = (User) entityManager.createQuery("from User where username = :username")
				.setParameter("username", username)
				.getSingleResult();
		
		String salt = user.getSalt();
		String cryptedPassword = HashingFunctions.hashPassword(password, salt);
		
		String token = "BAD_AUTHENTICATION";
		
		if (user.getPassword().equals(cryptedPassword))
		{
			token = "I_AM_A_TOKEN";
		}
		
		return new Token(token);
	}
	
	@RequestMapping("/register")
	public Token register(@RequestParam(value="username", required = true) String username
		, @RequestParam(value="password", required = true) String password
		, @RequestParam(value="publicIp", required = true) String publicIp
		, @RequestParam(value="port", required = true) int port)
	{
		String salt = HashingFunctions.generateSalt();
		String cryptedPassword = HashingFunctions.hashPassword(password, salt);
		
		// Store info in database
		User user = new User(username, cryptedPassword, salt, publicIp, port);
		userRepository.save(user);
		
		String token = "I_AM_A_TOKEN";
		return new Token(token);
	}
}