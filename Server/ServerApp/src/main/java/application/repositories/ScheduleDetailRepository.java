package application.repositories;

import org.springframework.data.repository.CrudRepository;

import application.model.peripherals.Peripheral;
import application.model.peripherals.ScheduleDetail;
import application.model.peripherals.State;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface ScheduleDetailRepository extends CrudRepository<ScheduleDetail, Integer>
{

}
