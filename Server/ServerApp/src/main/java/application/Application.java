package application;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
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
import application.utilities.HashingFunctions;

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
		int peripheralId = 1;// ThermoSalon
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
					//Reduce size of state request to represent a smaller dataset(not 9k for 1 year)
					//Get about 2% of data size
					int random = ThreadLocalRandom.current().nextInt(1, 1000);
					if (random <= 20) {
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

	}

	@Bean
	InitializingBean sendDatabase() {
		return () -> {
			try {

				boolean generateData = true;
				if (generateData == false) {
					List<String> rfids = new ArrayList<String>();
					for (int i = 0; i < 10; i++) {
						String rfid = "RFID#" + Integer.toString(i);
						rfids.add(rfid);
					}

					User user1 = new User("Sim", "simsim", "asd");
					user1.setRfids(rfids);
					user1.setToken("2f58261f-a0f2-403f-9d7a-ccf202a962a7");
					User user2 = new User("Max", "maxmax", "asd");
					Domicile dom = new Domicile(123123, "Dom1", "Rue Trwqer", 12, "H1H1H1", "Montreal", "QQ", "Ca",
							"domo", "domodomo", "asd", "localhost", 23);
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

					User julien_local = new User("julien_local", HashingFunctions.hashPassword("pfe", julienSalt),
							julienSalt);
					julien_local.setToken("2f58261f-a0f2-403f-9d7a-ccf202a962a7");
					Domicile domJulienLocal = new Domicile(1234, "Appart Julien", "Rue La Fontaine", 4674, "H1V1P7",
							"Montreal", "QC", "Ca", "domojj", "domodomo", "asd", "192.168.0.177", 5000);
					domJulienLocal.setToken("3f58261f-a0f2-403f-9d7a-ccf202a962a8");
					Peripheral julienThermo = new Peripheral("98:D3:31:B3:D5:DD", "Salon");
					julienThermo.setCurrentState(new Thermostat("22", "21", "11", "12"));
					domJulienLocal.addUser(julien_local);
					domJulienLocal.addPeripheral(julienThermo);
					julien_local = userRepository.save(julien_local);
					julienThermo = peripheralRepository.save(julienThermo);
					domJulienLocal = domicileRepository.save(domJulienLocal);

					String salt_remote = HashingFunctions.generateSalt();
					String encryptedPassword = HashingFunctions.hashPassword("pfe", salt_remote);
					User julien_remote = new User("julien_remote", encryptedPassword, salt_remote);
					julien_remote.setToken("2f58261f-a0f2-403f-9d7a-ccf202a962a7");
					Domicile domJulienRemote = new Domicile(1111, "Appart Julien", "Rue La Fontaine", 4674, "H1V1P7",
							"Montreal", "QC", "Ca", "domojre", "domodomo", "asd", "projetjmhome.ddns.net", 22321);
					Peripheral julienThermoRemote = new Peripheral("98:D3:31:B3:D5:DD", "Salon");
					julienThermoRemote.setCurrentState(new Thermostat("22", "21", "11", "12"));
					domJulienRemote.setToken("3f58261f-a0f2-403f-9d7a-ccf202a962a8");
					domJulienRemote.addUser(julien_remote);
					domJulienRemote.addPeripheral(julienThermoRemote);
					julien_remote = userRepository.save(julien_remote);
					julienThermoRemote = peripheralRepository.save(julienThermoRemote);
					domJulienRemote = domicileRepository.save(domJulienRemote);
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
