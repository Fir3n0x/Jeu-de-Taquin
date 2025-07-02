package insa.rennes.web2;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface GameRepository extends CrudRepository<Grid, Long> {    
}
