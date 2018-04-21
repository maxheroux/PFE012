package application.repositories;

import org.springframework.data.repository.CrudRepository;

import application.model.Alert;

//This will be AUTO IMPLEMENTED by Spring into a Bean called alertRepository
//CRUD refers Create, Read, Update, Delete

public interface AlertRepository extends CrudRepository<Alert, Integer> {

}
