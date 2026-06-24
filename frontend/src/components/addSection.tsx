import * as Styled from "../styles/styledComponents";
import type { Category } from "../types/shoppingTypes";

type Props = {
  categories: readonly Category[];
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
        {categories.map((category) => (
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