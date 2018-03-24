package application.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import application.model.Domicile;

//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete

public interface DomicileRepository extends CrudRepository<Domicile, Long> {

	@Query(value = "Select * FROM client d INNER JOIN client u ON u.home_id = d.id WHERE u.id =:user_id ",nativeQuery=true)
	public Domicile findByUserId(@Param("user_id")int userId);

}
