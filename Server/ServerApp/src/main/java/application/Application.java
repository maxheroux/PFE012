package application;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;

import application.model.Domicile;
import application.model.User;
import application.model.messages.StateChange;
import application.model.peripherals.Light;
import application.model.peripherals.Peripheral;
import application.model.peripherals.Thermostat;
import application.repositories.DomicileRepository;
import application.repositories.MessageRepository;
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
	@Autowired
	private MessageRepository messageRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	public int temperatureGenerator(int hour) {
		int temp = 0;
		if (0 <= hour && hour < 6) {
			temp = ThreadLocalRandom.current().nextInt(15, 18);
		} else if (6 <= hour && hour < 12) {
			temp = ThreadLocalRandom.current().nextInt(19, 23);
		} else if (12 <= hour && hour < 18) {
			temp = ThreadLocalRandom.current().nextInt(21, 24);
		} else if (18 <= hour && hour <= 24) {
			temp = ThreadLocalRandom.current().nextInt(16, 19);
		}

		return temp;
	}

	public void generateData() {
		int peripheralId = 3;// ThermoSalon
		User user = userRepository.findByUsername("Sim");
		String username = user.getUsername();
		String token = user.getToken();

		for (int month = 0; month < 12; month++) {
			Calendar calendar = Calendar.getInstance();
			calendar.set(2018, month, 1);
			int daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
			calendar.clear();
			System.out.println("Month" + month + "Number of day: " + daysInMonth);
			for (int day = 1; day <= daysInMonth; day++) {
				for (int hour = 0; hour <= 23; hour++) {
					Map<String, String> data = new HashMap<String, String>();
					int temp = temperatureGenerator(hour);
					// current_tempature,desired_temperature\
					String value = String.valueOf(temp);
					data.put("desired_temperature", value);
					LocalDateTime dateTime = LocalDateTime.of(2018, month + 1, day, hour, 0);
					// dateTime.withYear(2018).withMonth(month).withDayOfMonth(day).withHour(hour);
					StateChange stateChange = new StateChange(peripheralId, username, data, token);
					stateChange.setDateTime(dateTime);
					messageRepository.save(stateChange);
				}

			}
		}

	}

	@Bean
	InitializingBean sendDatabase() {
		return () -> {
			try {
				boolean generateData = true;
				if (generateData == false) {
					User user1 = new User("Sim", "simsim", "asd", "localhost", 23);
					user1.setToken("2f58261f-a0f2-403f-9d7a-ccf202a962a7");
					User user2 = new User("Max", "maxmax", "asd", "localhost", 23);
					Domicile dom = new Domicile(123125, "Dom1", "Rue Trwqer", 12, "H1H1H1", "Montreal", "QQ", "Ca",
							user1.getUsername(), "domodomo", "asd");
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
					System.out.println(dom.getName() + "testsets");
					dom = domicileRepository.save(dom);
				} else {
					generateData();
				}

				System.out.println("Default data loaded in database");
			} catch (DataIntegrityViolationException e) {
				System.out.println("Default data already in database");
			} catch (Exception e) {
				e.printStackTrace();
			}
		};
	}

}
