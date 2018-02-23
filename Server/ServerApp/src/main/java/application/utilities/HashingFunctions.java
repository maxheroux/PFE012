package application.utilities;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Random;

public class HashingFunctions 
{
	private static final int NUMBEROFCRYPTCYCLE = 10;
	private static final int SALTLENGTH = 18;
	
	public static String hashPassword(String preHashPassword, String salt)
	{
		String cryptedPassword = "";
		
		try 
		{	
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			digest.update((preHashPassword + salt).getBytes(StandardCharsets.UTF_8));
			cryptedPassword = new String(digest.digest());
			
			for (int i = 0; i < NUMBEROFCRYPTCYCLE; i++)
			{
				digest.update(cryptedPassword.getBytes(StandardCharsets.UTF_8));
				cryptedPassword = new String(digest.digest());
			}
		} 
		catch (Exception e) 
		{
			System.out.println(e.toString());
		}
		
		return cryptedPassword;
	}
	
	public static String generateSalt()
	{
		String saltChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		StringBuilder salt = new StringBuilder();
		Random rnd = new Random();
		
		while (salt.length() < SALTLENGTH)
		{
			int index = (int) (rnd.nextFloat() * saltChars.length());
			salt.append(saltChars.charAt(index));
		}
		
		String saltStr = salt.toString();
		
		return saltStr;
	}
}