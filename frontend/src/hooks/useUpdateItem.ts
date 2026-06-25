import { useMutation } from "react-relay";
import type { Item } from "../types/shoppingTypes";
import { updateItemMutation } from "../graphql/mutations/updateItemMutation";
import type { AppUpdateItemMutation } from "../graphql/mutations/__generated__/AppUpdateItemMutation.graphql";

type UpdateItemArgs = {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  editItemName: string;
  editCategoryID: string;
  cancelEditing: () => void;
};

export function useUpdateItem({
  setItems,
  editItemName,
  editCategoryID,
  cancelEditing,
}: UpdateItemArgs) {

  const [commitUpdateItem, isUpdateItemInFlight] =
    useMutation<AppUpdateItemMutation>(updateItemMutation);

  const saveEditedItem = (itemID: number) => {
    const itemName = editItemName.trim();
    const categoryID = Number(editCategoryID);

    if (!itemName || !categoryID) {
      alert("Item name and category are required.");
      return;
    }

    commitUpdateItem({
      variables: {
        itemID,
        itemName,
        categoryID,
      },

      onCompleted: (response: AppUpdateItemMutation["response"]) => {
        const updatedItem: Item = response.updateItem;

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.itemID === updatedItem.itemID
              ? updatedItem
              : item
          )
        );

        cancelEditing();
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };

  return {
    saveEditedItem,
    isUpdateItemInFlight,
  };
}