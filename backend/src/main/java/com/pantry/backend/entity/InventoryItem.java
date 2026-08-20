package com.pantry.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class InventoryItem {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String name;

    @Column
    private int quantity;

    @Column
    private int minThreshold;

    public InventoryItem() {
    }

    public InventoryItem(String name, int quantity, int minThreshold) {
        this.name = name;
        this.quantity = quantity;
        this.minThreshold = minThreshold;
    }

    /**
     * Verifies if the stock is low
     * @return true only when the quantity is strictly less than the minThreshold
     */
    public boolean isLow(){
        return quantity < minThreshold;
    }

    /**
     * Adds a quantity to the item
     * @param quantity the quantity to be added
     */
    public void addQuantity(int quantity){
        this.quantity += quantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getMinThreshold() {
        return minThreshold;
    }

    public void setMinThreshold(int minThreshold) {
        this.minThreshold = minThreshold;
    }
}
