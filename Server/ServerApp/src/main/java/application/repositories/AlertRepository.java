package application.repositories;

import org.springframework.data.repository.CrudRepository;

import application.model.messages.Message;

//This will be AUTO IMPLEMENTED by Spring into a Bean called alertRepository
//CRUD refers Create, Read, Update, Delete

public interface AlertRepository extends CrudRepository<Message, Long> {

}
