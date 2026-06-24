import * as Styled from "../styles/styledComponents";
import type { Category } from "../types/shoppingTypes";

type Props = {
  categories: readonly Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  clearBoughtItems: () => void;
};

export default function FilterSection({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchText,
  setSearchText,
  clearBoughtItems,
}: Props) {
  return (
    <Styled.FilterSection>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>

        {categories.map((category) => (
          <option key={category.categoryID} value={category.categoryName}>
            {category.categoryName}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search items..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Styled.ActionButton onClick={clearBoughtItems}>
        Clear Bought Items
      </Styled.ActionButton>
    </Styled.FilterSection>
  );
}