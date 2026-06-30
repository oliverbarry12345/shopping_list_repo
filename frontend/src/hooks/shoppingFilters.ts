import type { ShoppingList_query$data } from "../graphql/fragments/__generated__/ShoppingList_query.graphql";

//This file calculates the statistics, filtering and sorting for the shopping list. 

type Items = ShoppingList_query$data["items"];

export function shoppingFilters(
  items: Items,
  selectedCategory: string,
  searchText: string
) {
  const totalItems = items.length;

  const boughtItems = items.filter((item) => item.bought).length;

  const remainingItems = totalItems - boughtItems;

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category.categoryName === selectedCategory;

    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    return Number(a.bought) - Number(b.bought);
  });

  return {
    totalItems,
    boughtItems,
    remainingItems,
    filteredItems,
    sortedItems,
  };
}