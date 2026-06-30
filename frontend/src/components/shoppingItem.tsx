import { useFragment } from "react-relay";
import * as Styled from "../styles/styledComponents";
import type { Item } from "../types/shoppingTypes";
import type { Category_category$key } from "../graphql/fragments/__generated__/Category_category.graphql";
import { categoryFragment } from "../graphql/fragments/categoryFragment";
import { shoppingItemFragment } from "../graphql/fragments/shoppingItemFragment";
import type { ShoppingItem_item$key } from "../graphql/fragments/__generated__/ShoppingItem_item.graphql";

type Props = {
  item: ShoppingItem_item$key;
  categories: Category_category$key;

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
  const itemData = useFragment(shoppingItemFragment, item);

  const categoryData = useFragment(
    categoryFragment,
    categories
  );
  
  //item editing still expects item type. editing helpers need to be converted to relay fragment data. 
  const itemForEditing: Item = {
    itemID: itemData.itemID,
    itemName: itemData.itemName,
    bought: itemData.bought,
    category: {
      categoryID: itemData.category.categoryID,
      categoryName: itemData.category.categoryName,
    },
  };

  return (
    <Styled.ItemRow>
      {editingItemID === itemData.itemID ? (
        <>
          <input
            value={editItemName}
            onChange={(e) => setEditItemName(e.target.value)}
          />

          <span>{itemData.bought ? "Yes" : "No"}</span>

          <select
            value={editCategoryID}
            onChange={(e) => setEditCategoryID(e.target.value)}
          >
            <option value="">Select category</option>
            {categoryData.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <Styled.ButtonGroup>
            <Styled.ActionButton onClick={() => saveEditedItem(itemData.itemID)}>
              Save
            </Styled.ActionButton>
            <Styled.ActionButton onClick={cancelEditing}>
              Cancel
            </Styled.ActionButton>
          </Styled.ButtonGroup>
        </>
      ) : (
        <>
          <span>{itemData.itemName}</span>

          <span>{itemData.bought ? "Yes" : "No"}</span>

          <span>{itemData.category.categoryName}</span>

          <Styled.ButtonGroup>
            <Styled.ActionButton
              onClick={() => toggleBought(itemData.itemID, !itemData.bought)}
            >
              {itemData.bought ? "Mark Not Bought" : "Mark Bought"}
            </Styled.ActionButton>

            <Styled.ActionButton onClick={() => startEditing(itemForEditing)}>
              Edit
            </Styled.ActionButton>

            <Styled.ActionButton onClick={() => handleDeleteItem(itemData.itemID)}>
              Delete
            </Styled.ActionButton>
          </Styled.ButtonGroup>
        </>
      )}
    </Styled.ItemRow>
  );
}