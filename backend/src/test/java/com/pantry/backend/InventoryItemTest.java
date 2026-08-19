package com.pantry.backend;

import com.pantry.backend.entity.InventoryItem;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class InventoryItemTest {
    @Test
    void testIsLowStock() {
        //Quantity is strictly less than threshold (Should be TRUE)
        InventoryItem lowItem = new InventoryItem("Apples", 4, 5);
        assertTrue(lowItem.isLow(), "Item should be low stock");

        //Quantity is exactly equal to threshold (Should be FALSE)
        InventoryItem boundaryItem = new InventoryItem("Bananas", 5, 5);
        assertFalse(boundaryItem.isLow(), "Item should not be low stock when quantity == minThreshold");

        //Quantity is greater than threshold (Should be FALSE)
        InventoryItem stockedItem = new InventoryItem("Oranges", 10, 5);
        assertFalse(stockedItem.isLow(), "Item should not be low stock");
    }
}
