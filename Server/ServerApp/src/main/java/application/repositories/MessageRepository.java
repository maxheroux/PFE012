package application.repositories;

import org.springframework.data.repository.CrudRepository;

import application.model.messages.Message;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface MessageRepository extends CrudRepository<Message, Long> {

}
