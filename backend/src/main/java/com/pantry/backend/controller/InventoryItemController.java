package com.pantry.backend.controller;

import com.pantry.backend.entity.InventoryItem;
import com.pantry.backend.entity.Item;
import com.pantry.backend.service.InventoryItemService;
import org.springframework.web.bind.annotation.*;
import tools.jackson.databind.util.JSONPObject;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryItemController {
    private final InventoryItemService service;

    public InventoryItemController(InventoryItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Item> getAllItems(){
        return service.getAllItems();
    }

    @PostMapping
    public void createItem(@RequestBody InventoryItem item){
        service.createItem(item);
    }

    @PatchMapping("/{id}/restock")
    public void restockItem(@PathVariable Long id, @RequestBody Map<String, Integer> body){
        service.restockItem(id, body.get("quantity"));
    }
}
