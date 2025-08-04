package org.discountdeals.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favorites")
public class Favorite {

    // Primary key for the Favorite table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many favorites can belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // Many favorites can belong to one deal
    @ManyToOne
    @JoinColumn(name = "deal_id", referencedColumnName = "id")
    private Deal deal;
    public Favorite() {}

    public Favorite(User user, Deal deal) {
        this.user = user;
        this.deal = deal;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Deal getDeal() {
        return deal;
    }

    public void setDeal(Deal deal) {
        this.deal = deal;
    }
}
