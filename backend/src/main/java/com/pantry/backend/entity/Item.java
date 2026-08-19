package com.pantry.backend.entity;

public class Item {
    private InventoryItem item;
    private boolean isLowStock;

    public Item(InventoryItem item, boolean isLowStock) {
        this.item = item;
        this.isLowStock = isLowStock;
    }
}
