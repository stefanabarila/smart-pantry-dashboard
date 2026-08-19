package com.pantry.backend.entity;

import jakarta.persistence.Column;

public class Item {
    private long id;
    private String name;
    private int quantity;
    private int minThreshold;
    private boolean isLowStock;

    public Item(String name, int quantity, int minThreshold, boolean isLowStock) {
        this.name = name;
        this.quantity = quantity;
        this.minThreshold = minThreshold;
        this.isLowStock = isLowStock;
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

    public boolean isLowStock() {
        return isLowStock;
    }

    public void setLowStock(boolean lowStock) {
        isLowStock = lowStock;
    }
}
