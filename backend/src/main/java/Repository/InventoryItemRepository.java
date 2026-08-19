package Repository;

import entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public class InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
}
