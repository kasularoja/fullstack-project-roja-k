package org.discountdeals.repository;

import org.discountdeals.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository // This annotation indicates that this interface is a Spring Data repository

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    // Custom query method to find favorites by user ID

    List<Favorite> findByUserId(Long userId);
}
