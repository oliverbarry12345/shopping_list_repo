import { useMutation } from "react-relay";
import type { Item } from "../types/shoppingTypes";
import { toggleBoughtMutation } from "../graphql/mutations/toggleBoughtMutation";
import type { AppToggleBoughtMutation } from "../graphql/mutations/__generated__/AppToggleBoughtMutation.graphql";

type ToggleBoughtArgs = {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export function useToggleBought({ setItems }: ToggleBoughtArgs) {
  const [commitToggleBought, isToggleBoughtInFlight] =
    useMutation<AppToggleBoughtMutation>(toggleBoughtMutation);

  const toggleBought = (itemID: number, bought: boolean) => {
    commitToggleBought({
      variables: {
        itemID,
        bought,
      },
      onCompleted: (
        response: AppToggleBoughtMutation["response"]) => {
        const updatedItem: Item = response.toggleBought;

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.itemID === updatedItem.itemID ? updatedItem : item
          )
        );
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  return {
    toggleBought,
    isToggleBoughtInFlight,
  };
}