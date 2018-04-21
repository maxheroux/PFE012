package application.repositories;

import org.springframework.transaction.annotation.Transactional;

import application.model.messages.StateRequest;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

@Transactional
public interface StateRequestRepository extends BaseMessageRepository<StateRequest> {
	
	
}
