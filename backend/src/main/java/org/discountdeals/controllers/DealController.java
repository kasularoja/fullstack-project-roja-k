package org.discountdeals.controllers;


import org.discountdeals.model.Deal;
import org.discountdeals.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    @Autowired
    private DealRepository dealRepository;

    // ✅ CREATE — POST
    @PostMapping
    public Deal createDeal(@RequestBody Deal deal) {
        return dealRepository.save(deal);
    }

    // ✅ READ — GET (get all deals)
    @GetMapping
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    // ✅ READ — GET (get one deal by ID)
    @GetMapping("/{id}")
    public ResponseEntity<Deal> getDealById(@PathVariable Long id) {
        Optional<Deal> deal = dealRepository.findById(id);
        return deal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ UPDATE — PUT
    @PutMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(@PathVariable Long id, @RequestBody Deal updatedDeal) {
        Optional<Deal> optionalDeal = dealRepository.findById(id);
        if (optionalDeal.isPresent()) {
            Deal deal = optionalDeal.get();
            deal.setTitle(updatedDeal.getTitle());
            deal.setDescription(updatedDeal.getDescription());
            deal.setPrice(updatedDeal.getPrice());
            deal.setDiscountPrice(updatedDeal.getDiscountPrice());
            deal.setCategory(updatedDeal.getCategory());
            dealRepository.save(deal);
            return ResponseEntity.ok(deal);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ DELETE — DELETE
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
