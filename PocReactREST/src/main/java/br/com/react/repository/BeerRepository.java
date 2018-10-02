package br.com.react.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.react.model.Beer;


@RepositoryRestResource
public interface BeerRepository extends CrudRepository<Beer, Long> {

}
