package org.discountdeals.repositories;

import org.discountdeals.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavouriteRepository extends JpaRepository<Favorite, String> {

    // Custom query methods can be added here if needed
    // For example, to find favorites by userId:
    // List<Favorite> findByUserId(String userId);
}
