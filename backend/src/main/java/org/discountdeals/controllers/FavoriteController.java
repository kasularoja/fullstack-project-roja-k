package org.discountdeals.controllers;

import org.discountdeals.model.Favorite;
import org.discountdeals.model.User;
import org.discountdeals.model.Deal;
import org.discountdeals.repository.FavoriteRepository;
import org.discountdeals.repository.UserRepository;
import org.discountdeals.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DealRepository dealRepository;

    // Create favorite (add deal to user favorites)
    @PostMapping
    public ResponseEntity<Favorite> createFavorite(@RequestParam Long userId, @RequestParam Long dealId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Deal> dealOpt = dealRepository.findById(dealId);
        if (userOpt.isPresent() && dealOpt.isPresent()) {
            Favorite favorite = new Favorite();
            favorite.setUser(userOpt.get());
            favorite.setDeal(dealOpt.get());
            return ResponseEntity.ok(favoriteRepository.save(favorite));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get favorites for a user
    @GetMapping("/user/{userId}")
    public List<Favorite> getFavoritesByUser(@PathVariable Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    // Delete favorite by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long id) {
        if (favoriteRepository.existsById(id)) {
            favoriteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
