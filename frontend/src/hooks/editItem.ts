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
  const startEditing = (
    itemID: number,
    itemName: string,
    categoryID: number

  ) => {
    setEditingItemID(itemID);
    setEditItemName(itemName);
    setEditCategoryID(String(categoryID));
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