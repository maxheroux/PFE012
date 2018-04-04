package application;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;

import application.model.Domicile;
import application.model.User;
import application.model.peripherals.Light;
import application.model.peripherals.Peripheral;
import application.model.peripherals.Thermostat;
import application.repositories.DomicileRepository;
import application.repositories.PeripheralRepository;
import application.repositories.UserRepository;
import application.utilities.HashingFunctions;

@SpringBootApplication
public class Application {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DomicileRepository domicileRepository;
	@Autowired
	private PeripheralRepository peripheralRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	InitializingBean sendDatabase() {
		return () -> {
			try {
								
				User user1 = new User("Sim", "simsim", "asd");
				user1.setToken("2f58261f-a0f2-403f-9d7a-ccf202a962a7");
				User user2 = new User("Max", "maxmax", "asd");
				Domicile dom = new Domicile(123123, "Dom1", "Rue Trwqer", 12, "H1H1H1", "Montreal", "QQ", "Ca", "domo",
						"domodomo", "asd", "localhost", 23);
				dom.setToken("3f58261f-a0f2-403f-9d7a-ccf202a962a7");
				Peripheral thermo = new Peripheral("AA-BB-CC-AA-AA-232", "ThermoSalon");
				thermo.setCurrentState(new Thermostat("22", "21", "11", "12"));
				Peripheral light = new Peripheral("GG-BB-CC-TT-AA-232", "Lumiere Chambre 32");
				light.setCurrentState(new Light(false, 22));
				dom.addUser(user1);
				dom.addPeripheral(thermo);
				dom.addPeripheral(light);
				user1 = userRepository.save(user1);
				user2 = userRepository.save(user2);
				thermo = peripheralRepository.save(thermo);
				light = peripheralRepository.save(light);
				dom = domicileRepository.save(dom);
				
				
				String julienSalt = HashingFunctions.generateSalt();
				
				User julien_local = new User("julien_local", HashingFunctions.hashPassword("pfe", julienSalt), julienSalt);
				julien_local.setToken("2f58261f-a0f2-403f-9d7a-ccf202a962a7");
				Domicile domJulienLocal = new Domicile(1234, "Appart Julien", "Rue La Fontaine", 4674, "H1V1P7", "Montreal", "QC", "Ca", "domojj",
						"domodomo", "asd", "192.168.0.177", 5000);
				domJulienLocal.setToken("3f58261f-a0f2-403f-9d7a-ccf202a962a8");
				Peripheral julienThermo = new Peripheral("98:D3:31:B3:D5:DD", "Salon");
				julienThermo.setCurrentState(new Thermostat("22", "21", "11", "12"));
				domJulienLocal.addUser(julien_local);
				domJulienLocal.addPeripheral(julienThermo);
				julien_local = userRepository.save(julien_local);
				julienThermo = peripheralRepository.save(julienThermo);
				domJulienLocal = domicileRepository.save(domJulienLocal);
				
				User julien_remote = new User("julien_remote", HashingFunctions.hashPassword("pfe", julienSalt), julienSalt);
				julien_remote.setToken("2f58261f-a0f2-403f-9d7a-ccf202a962a7");
				Domicile domJulienRemote = new Domicile(1111, "Appart Julien", "Rue La Fontaine", 4674, "H1V1P7", "Montreal", "QC", "Ca", "domojj",
						"domodomo", "asd", "projetjmhome.ddns.net", 22321);
				Peripheral julienThermoRemote = new Peripheral("98:D3:31:B3:D5:DD", "Salon");
				julienThermoRemote.setCurrentState(new Thermostat("22", "21", "11", "12"));
				domJulienRemote.setToken("3f58261f-a0f2-403f-9d7a-ccf202a962a8");
				domJulienRemote.addUser(julien_remote);
				domJulienRemote.addPeripheral(julienThermoRemote);
				julien_remote = userRepository.save(julien_remote);
				julienThermoRemote = peripheralRepository.save(julienThermoRemote);
				domJulienRemote = domicileRepository.save(domJulienRemote);
				
				System.out.println("Default data loaded in database");
			} catch (DataIntegrityViolationException e) {
				System.out.println("Default data already in database");
			} catch (Exception e) {
				e.printStackTrace();
			}
		};
	}

}
