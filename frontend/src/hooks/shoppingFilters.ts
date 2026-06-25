import type { Item } from "../types/shoppingTypes";

export function shoppingFilters(
  items: Item[],
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