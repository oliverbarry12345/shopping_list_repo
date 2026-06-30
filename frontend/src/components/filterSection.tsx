import { useFragment } from "react-relay";
import * as Styled from "../styles/styledComponents";
import type { Category_category$key } from "../graphql/fragments/__generated__/Category_category.graphql";
import { categoryFragment } from "../graphql/fragments/categoryFragment";

type Props = {
  categories: Category_category$key;
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

  // Read the category list from its relay fragment
  const categoryData = useFragment(
    categoryFragment,
    categories
  );

  return (
    <Styled.FilterSection>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>

        {categoryData.map((category) => (
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