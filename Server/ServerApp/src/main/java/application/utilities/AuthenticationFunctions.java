package application.utilities;

import java.util.UUID;

import application.authentication.User;

public class AuthenticationFunctions {

	public static boolean isTokenValid(User user, String token)
	{
		if (user.getToken().equals(token))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public static String generateToken()
	{
		String uniqueToken = UUID.randomUUID().toString();
		
		return uniqueToken;
	}
}
