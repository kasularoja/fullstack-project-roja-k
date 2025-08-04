package org.discountdeals.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "deals")
public class Deal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private double price;
    private double discountPrice;
    private String category;
    private LocalDate expiryDate;

    @OneToMany(mappedBy = "deal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Favorite> favorites;

    @Version
    private Integer version;

    public Deal() {}

    public Deal(String title, String description, double price, double discountPrice, String category, Integer version, LocalDate expiryDate) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountPrice = discountPrice;
        this.category = category;
        this.version = version;
        this.expiryDate = expiryDate;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }

    public void setPrice(double price) { this.price = price; }

    public double getDiscountPrice() { return discountPrice; }

    public void setDiscountPrice(double discountPrice) { this.discountPrice = discountPrice; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public List<Favorite> getFavorites() { return favorites; }

    public void setFavorites(List<Favorite> favorites) { this.favorites = favorites; }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }
}
