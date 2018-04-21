package application.repositories;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import application.model.messages.StateChange;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

@Transactional
public interface StateChangeRepository extends BaseMessageRepository<StateChange> {
	List<StateChange> findByPeripheralId(int peripheralId);
}
