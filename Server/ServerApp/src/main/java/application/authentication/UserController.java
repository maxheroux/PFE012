package application.authentication;
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
	
	@RequestMapping("/connection")
	public Token connection(@RequestParam(value="username", required = true) String username
		, @RequestParam(value="password", required = true) String password)
	{
		// TODO: Check if token is valid, else generate new token
		
		byte[] salt = HashingFunctions.generateSalt();  // TODO: Replace generation of salt by reading of salt in the database
		String cryptedPassword = HashingFunctions.hashPassword(password, salt);
		
		// TODO: Compare hash, if the same -> grant token
		String token = "I_AM_A_TOKEN";
		return new Token(token);
	}
	
	@RequestMapping("/register")
	public Token register(@RequestParam(value="username", required = true) String username
		, @RequestParam(value="password", required = true) String password
		, @RequestParam(value="publicIp", required = true) String publicIp
		, @RequestParam(value="port", required = true) int port)
	{
		byte[] salt = HashingFunctions.generateSalt();
		String cryptedPassword = HashingFunctions.hashPassword(password, salt);
		
		// Store info in database
		User user = new User(username, cryptedPassword, salt.toString(), publicIp, port);
		userRepository.save(user);
		
		String token = "I_AM_A_TOKEN";
		return new Token(token);
	}
}