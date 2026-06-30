import { useMutation } from "react-relay";
import { addItemMutation } from "../graphql/mutations/addItemMutation";
import type { AppAddItemMutation } from "../graphql/mutations/__generated__/AppAddItemMutation.graphql";

type AddItemArgs = {
  refreshQuery: () => void;
  newItemName: string;
  setNewItemName: React.Dispatch<React.SetStateAction<string>>;
  newCategoryID: string;
  setNewCategoryID: React.Dispatch<React.SetStateAction<string>>;
};

export function useAddItem({
  refreshQuery,
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

      onCompleted: () => {
        setNewItemName("");
        setNewCategoryID("");
        refreshQuery();
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