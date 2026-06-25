import { commitMutation } from "react-relay";
import type { Environment } from "relay-runtime";
import type { Item } from "../types/shoppingTypes";
import { updateItemMutation } from "../graphql/mutations/updateItemMutation";

type UpdateItemArgs = {
  environment: Environment;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  editItemName: string;
  editCategoryID: string;
  cancelEditing: () => void;
};

export function createUpdateItemHandler({
  environment,
  setItems,
  editItemName,
  editCategoryID,
  cancelEditing,
}: UpdateItemArgs) {
  return function saveEditedItem(itemID: number) {
    const itemName = editItemName.trim();
    const categoryID = Number(editCategoryID);

    if (!itemName || !categoryID) {
      alert("Item name and category are required.");
      return;
    }

    commitMutation(environment, {
      mutation: updateItemMutation,
      variables: {
        itemID,
        itemName,
        categoryID,
      },
      onCompleted: (response: any) => {
        const updatedItem: Item = response.updateItem;

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.itemID === updatedItem.itemID ? updatedItem : item
          )
        );

        cancelEditing();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
}