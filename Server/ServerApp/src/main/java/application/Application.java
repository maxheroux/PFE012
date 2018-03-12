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
				User user1 = new User("Sim", "simsim", "asd", "localhost", 23);
				user1.setToken("2f58261f-a0f2-403f-9d7a-ccf202a962a7");
				User user2 = new User("Max", "maxmax", "asd", "localhost", 23);
				Domicile dom = new Domicile(123123, "Dom1", "Rue Trwqer", 12, "H1H1H1", "Montreal", "QQ", "Ca", "domo",
						"domodomo", "asd");
				Peripheral thermo = new Peripheral("AA-BB-CC-AA-AA-232", "ThermoSalon");
				thermo.setCurrentState(new Thermostat("22", "21", "11", "12"));
				Peripheral light = new Peripheral("GG-BB-CC-TT-AA-232", "Lumiere Chambre 32");
				light.setCurrentState(new Light(false, true, 11, 22));
				dom.addUser(user1);
				dom.addPeripheral(thermo);
				dom.addPeripheral(light);
				user1 = userRepository.save(user1);
				user2 = userRepository.save(user2);
				thermo = peripheralRepository.save(thermo);
				light = peripheralRepository.save(light);
				dom = domicileRepository.save(dom);
				System.out.println("Default data loaded in database");
			} catch (DataIntegrityViolationException e) {
				System.out.println("Default data already in database");
			} catch (Exception e) {
				e.printStackTrace();
			}
		};
	}

}
