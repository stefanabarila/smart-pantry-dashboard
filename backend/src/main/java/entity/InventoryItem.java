package entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class InventoryItem {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

    @Setter
    @Getter
    @Column
    private String name;

    @Setter
    @Getter
    @Column
    private int quantity;

    @Setter
    @Getter
    @Column
    private int minThreshold;

    public InventoryItem() {
    }

    public InventoryItem(String name, int quantity, int minThreshold) {
        this.name = name;
        this.quantity = quantity;
        this.minThreshold = minThreshold;
    }

    public boolean isLow(){
        return quantity < minThreshold;
    }

    public void addQuantity(int quantity){
        this.quantity += quantity;
    }
}
