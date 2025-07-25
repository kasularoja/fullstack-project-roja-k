package org.discountdeals.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table (name = "favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private String userId;

    private String dealId;

    private String dealTitle;

    private String dealImageUrl;

    private double dealPrice;

    private double dealDiscountPrice;

    private String dealCategory;

    private String dealDescription;

    @ManyToOne
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "id")
    private Deal deal;



    public Favorite() {
        // Default constructor
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
