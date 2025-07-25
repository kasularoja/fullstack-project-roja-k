package org.discountdeals.repositories;

import org.discountdeals.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    // Custom query methods can be added here if needed
    // For example, to find users by email:
    // User findByEmail(String email);
}
