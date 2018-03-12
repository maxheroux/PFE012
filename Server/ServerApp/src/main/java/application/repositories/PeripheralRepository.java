package application.repositories;

import org.springframework.data.repository.CrudRepository;

import application.model.peripherals.Peripheral;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface PeripheralRepository extends CrudRepository<Peripheral, Long>
{

}
