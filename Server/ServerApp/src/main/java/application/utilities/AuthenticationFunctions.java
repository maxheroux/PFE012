package application.utilities;

import java.util.UUID;

import application.model.Client;

public class AuthenticationFunctions {

	public static boolean isTokenValid(Client client, String token)
	{
		if (client != null && client.getToken().equals(token))
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
