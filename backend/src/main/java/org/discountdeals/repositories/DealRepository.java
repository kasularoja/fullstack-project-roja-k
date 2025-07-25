package org.discountdeals.repositories;

import org.discountdeals.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository<Deal, String> {

    // Custom query methods can be added here if needed
    // For example, to find deals by category:
    // List<Deal> findByCategory(String category);
}
