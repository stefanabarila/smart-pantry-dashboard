package com.pantry.backend.service;

import com.pantry.backend.entity.InventoryItem;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.pantry.backend.repository.InventoryItemRepository;
import com.pantry.backend.entity.Item;

import java.util.List;

@Service
public class InventoryItemService {
    private final InventoryItemRepository repo;

    public InventoryItemService(InventoryItemRepository repo) {
        this.repo = repo;
    }

    public List<Item> getAllItems(){
        return repo.findAll().stream().map(x -> new Item(x, x.isLow())).toList();
    }

    public void createItem(InventoryItem item){
        repo.save(item);
    }

    @Transactional
    public void restockItem(Long id, int quantity){
        if (repo.existsById(id)) {
            InventoryItem item = repo.findById(id).orElseThrow();
            item.addQuantity(quantity);
        }
    }
}
