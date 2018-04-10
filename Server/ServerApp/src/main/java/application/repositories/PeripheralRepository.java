package application.repositories;

import org.springframework.data.repository.CrudRepository;

import application.model.peripherals.Peripheral;
import application.model.peripherals.State;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface PeripheralRepository extends CrudRepository<Peripheral, Integer>
{
	public static State getNewConcreteState(State state){
		
		try {
			return state.getClass().newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
