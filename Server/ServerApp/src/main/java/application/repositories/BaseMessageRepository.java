package application.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import application.model.messages.Message;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

@NoRepositoryBean
public interface BaseMessageRepository<T extends Message> extends CrudRepository<T, Integer> {
	
	
}
