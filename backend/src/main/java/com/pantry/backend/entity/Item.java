package com.pantry.backend.entity;

import jakarta.persistence.Column;

public class Item {
    private long id;
    private String name;
    private int quantity;
    private int minThreshold;
    private boolean lowStock;

    public Item(Long id, String name, int quantity, int minThreshold, boolean lowStock) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.minThreshold = minThreshold;
        this.lowStock = lowStock;
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

    public boolean isLowStock() {
        return lowStock;
    }

    public void setLowStock(boolean lowStock) {
        this.lowStock = lowStock;
    }
}
