package application.utilities;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Random;

public class HashingFunctions 
{
	private static final Random RANDOM = new SecureRandom();
	private static final int NUMBEROFCRYPTCYCLE = 10;
	
	public static String hashPassword(String preHashPassword, byte[] salt)
	{
		String cryptedPassword = "";
		
		try 
		{
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			
			byte[] encodedHash = digest.digest((preHashPassword + salt).getBytes(StandardCharsets.UTF_8));
			cryptedPassword = encodedHash.toString();
			
			for (int i = 0; i < NUMBEROFCRYPTCYCLE; i++)
			{
				String tempHash = encodedHash.toString();
				encodedHash = digest.digest(tempHash.getBytes(StandardCharsets.UTF_8));
			}
		} 
		catch (Exception e) 
		{
			System.out.println(e.toString());
		}
		
		return cryptedPassword;
	}
	
	public static byte[] generateSalt()
	{
		byte[] salt = new byte[16];
		RANDOM.nextBytes(salt);
		return salt;
	}
}
