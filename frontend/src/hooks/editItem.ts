import type { Item } from "../types/shoppingTypes";

type EditItemArgs = {
  setEditingItemID: React.Dispatch<React.SetStateAction<number | null>>;
  setEditItemName: React.Dispatch<React.SetStateAction<string>>;
  setEditCategoryID: React.Dispatch<React.SetStateAction<string>>;
};

export function createEditItemHandlers({
  setEditingItemID,
  setEditItemName,
  setEditCategoryID,
}: EditItemArgs) {
  const startEditing = (item: Item) => {
    setEditingItemID(item.itemID);
    setEditItemName(item.itemName);
    setEditCategoryID(String(item.category.categoryID));
  };

  const cancelEditing = () => {
    setEditingItemID(null);
    setEditItemName("");
    setEditCategoryID("");
  };

  return {
    startEditing,
    cancelEditing,
  };
}   