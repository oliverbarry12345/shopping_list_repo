import { useMutation } from "react-relay";
import type { Item } from "../types/shoppingTypes";
import { addItemMutation } from "../graphql/mutations/addItemMutation";
import type { AppAddItemMutation } from "../graphql/mutations/__generated__/AppAddItemMutation.graphql";

type AddItemArgs = {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  newItemName: string;
  setNewItemName: React.Dispatch<React.SetStateAction<string>>;
  newCategoryID: string;
  setNewCategoryID: React.Dispatch<React.SetStateAction<string>>;
};

export function useAddItem({
  setItems,
  newItemName,
  setNewItemName,
  newCategoryID,
  setNewCategoryID,
}: AddItemArgs) {
  const [commitAddItem, isAddItemInFlight] =
    useMutation<AppAddItemMutation>(addItemMutation);

  const handleAddItem = () => {
    const itemName = newItemName.trim();
    const categoryID = Number(newCategoryID);

    if (!itemName || !categoryID) {
      alert("Item name and category are required.");
      return;
    }

    commitAddItem({
      variables: {
        itemName,
        categoryID,
      },

      onCompleted: (response: AppAddItemMutation["response"]) => {
        const newItem: Item = response.addItem;

        setItems((currentItems) => [
          ...currentItems,
          newItem,
        ]);

        setNewItemName("");
        setNewCategoryID("");
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };

  return {
    handleAddItem,
    isAddItemInFlight,
  };
}