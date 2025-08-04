package org.discountdeals.controllers;

import org.discountdeals.model.Deal;
import org.discountdeals.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/deals")
@CrossOrigin(origins = "*")
public class DealController {

    @Autowired
    private DealRepository dealRepository;

    // Get all deals
    @GetMapping
    public ResponseEntity<List<Deal>> getAllDeals() {
        List<Deal> deals = dealRepository.findAll();
        return ResponseEntity.ok(deals);
    }

    // Create new deal
    @PostMapping
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) {
        deal.setVersion(null);
        Deal savedDeal = dealRepository.save(deal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDeal);
    }

    // Update existing deal (optimistic locking)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDeal(@PathVariable Long id, @RequestBody Deal updatedDeal) {
        try {
            return dealRepository.findById(id)
                    .map(existing -> {
                        existing.setTitle(updatedDeal.getTitle());
                        existing.setDescription(updatedDeal.getDescription());
                        existing.setPrice(updatedDeal.getPrice());
                        existing.setDiscountPrice(updatedDeal.getDiscountPrice());
                        existing.setCategory(updatedDeal.getCategory());
                        existing.setExpiryDate(updatedDeal.getExpiryDate());
                        existing.setVersion(updatedDeal.getVersion());
                        Deal saved = dealRepository.save(existing);
                        return ResponseEntity.ok(saved);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (OptimisticLockingFailureException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Deal was updated by another transaction. Please reload and try again.");
        }
    }

    // Delete deal
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable Long id) {
        if (dealRepository.existsById(id)) {
            dealRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
