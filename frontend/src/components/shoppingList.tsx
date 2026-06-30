import { useFragment } from "react-relay";
import ShoppingItem from "./shoppingItem";
import StatsBar from "./statsBar";

import type { Item } from "../types/shoppingTypes";
import type { Category_category$key } from "../graphql/fragments/__generated__/Category_category.graphql";
import type { ShoppingList_query$key } from "../graphql/fragments/__generated__/ShoppingList_query.graphql";

import { shoppingListFragment } from "../graphql/fragments/shoppingListFragment";
import { shoppingFilters } from "../hooks/shoppingFilters";

//This component is in charge of the actual shopping list, and also contains the stats bar. 
type Props = {
  query: ShoppingList_query$key;
  categories: Category_category$key;

  selectedCategory: string;
  searchText: string;

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

export default function ShoppingList({
  query,
  categories,
  selectedCategory,
  searchText,
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
  const listData = useFragment(
    shoppingListFragment,
    query
  );

  const {
    totalItems,
    boughtItems,
    remainingItems,
    sortedItems,
  } = shoppingFilters(
    listData.items,
    selectedCategory,
    searchText
  );

  return (
    <>
      <StatsBar
        totalItems={totalItems}
        boughtItems={boughtItems}
        remainingItems={remainingItems}
      />

      {sortedItems.map((item) => (
        <ShoppingItem
          key={item.itemID}
          item={item}
          categories={categories}
          editingItemID={editingItemID}
          editItemName={editItemName}
          setEditItemName={setEditItemName}
          editCategoryID={editCategoryID}
          setEditCategoryID={setEditCategoryID}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          saveEditedItem={saveEditedItem}
          toggleBought={toggleBought}
          handleDeleteItem={handleDeleteItem}
        />
      ))}
    </>
  );
}