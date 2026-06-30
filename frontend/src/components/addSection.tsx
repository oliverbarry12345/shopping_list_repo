import { useFragment } from "react-relay";
import { categoryFragment } from "../graphql/fragments/categoryFragment";
import type { Category_category$key } from "../graphql/fragments/__generated__/Category_category.graphql";
import * as Styled from "../styles/styledComponents";

type Props = {
  categories: Category_category$key;
  newItemName: string;
  setNewItemName: (name: string) => void;
  newCategoryID: string;
  setNewCategoryID: (id: string) => void;
  handleAddItem: () => void;
};

export default function AddSection({
  categories,
  newItemName,
  setNewItemName,
  newCategoryID,
  setNewCategoryID,
  handleAddItem,
}: Props) {

  // reading the category fragment. 
  const categoryData = useFragment(
    categoryFragment,
    categories
  );

  return (
    <Styled.AddSection>
      <h2>Add new item:</h2>

      <input
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Name"
      />

      <select
        value={newCategoryID}
        onChange={(e) => setNewCategoryID(e.target.value)}
      >
        <option value="">Select category</option>
        {categoryData.map((category) => (
          <option key={category.categoryID} value={category.categoryID}>
            {category.categoryName}
          </option>
        ))}
      </select>

      <Styled.ActionButton onClick={handleAddItem}>
        Add Item
      </Styled.ActionButton>
    </Styled.AddSection>
  );
}