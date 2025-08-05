package org.discountdeals.repository;

import org.discountdeals.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository // Marks this interface as a Spring component to enable Spring Data JPA functionalities
public interface DealRepository extends JpaRepository<Deal, Long> {

    // Custom query methods can be added here if needed.
    // For example, to find deals by category:
    // List<Deal> findByCategory(String category);
}
