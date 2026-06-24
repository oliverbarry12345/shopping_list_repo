import * as Styled from "../styles/styledComponents";
import type { Item, Category } from "../types/shoppingTypes";

type Props = {
  item: Item;
  categories: readonly Category[];
  editingItemID: number | null;
  editItemName: string;
  setEditItemName: (name: string) => void;
  editCategoryID: string;
  setEditCategoryID: (id: string) => void;

  startEditing: (item: Item) => void;
  cancelEditing: () => void;
  saveEditedItem: (itemID: number) => void;

  toggleBought: (itemID: number, bought: boolean) => void;
  handleDeleteItem: (itemID: number) => void;
};

export default function ShoppingItem({
  item,
  categories,
  editingItemID,
  editItemName,
  setEditItemName,
  editCategoryID,
  setEditCategoryID,
  startEditing,
  cancelEditing,
  saveEditedItem,
  toggleBought,
  handleDeleteItem,
}: Props) {
  return (
    <Styled.ItemRow>
      {editingItemID === item.itemID ? (
        <>
          <input
            value={editItemName}
            onChange={(e) => setEditItemName(e.target.value)}
          />

          <span>{item.bought ? "Yes" : "No"}</span>

          <select
            value={editCategoryID}
            onChange={(e) => setEditCategoryID(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <Styled.ButtonGroup>
            <Styled.ActionButton onClick={() => saveEditedItem(item.itemID)}>
              Save
            </Styled.ActionButton>
            <Styled.ActionButton onClick={cancelEditing}>
              Cancel
            </Styled.ActionButton>
          </Styled.ButtonGroup>
        </>
      ) : (
        <>
          <span>{item.itemName}</span>

          <span>{item.bought ? "Yes" : "No"}</span>

          <span>{item.category.categoryName}</span>

          <Styled.ButtonGroup>
            <Styled.ActionButton
              onClick={() => toggleBought(item.itemID, !item.bought)}
            >
              {item.bought ? "Mark Not Bought" : "Mark Bought"}
            </Styled.ActionButton>

            <Styled.ActionButton onClick={() => startEditing(item)}>
              Edit
            </Styled.ActionButton>

            <Styled.ActionButton onClick={() => handleDeleteItem(item.itemID)}>
              Delete
            </Styled.ActionButton>
          </Styled.ButtonGroup>
        </>
      )}
    </Styled.ItemRow>
  );
}