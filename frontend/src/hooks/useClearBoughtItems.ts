import { useMutation } from "react-relay";
import type { Item } from "../types/shoppingTypes";
import { clearBoughtItemsMutation } from "../graphql/mutations/clearBoughtItemsMutation";
import type { AppClearBoughtItemsMutation } from "../graphql/mutations/__generated__/AppClearBoughtItemsMutation.graphql";

type ClearBoughtItemsArgs = {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export function useClearBoughtItems({
  setItems,
}: ClearBoughtItemsArgs) {

  const [
    commitClearBoughtItems,
    isClearBoughtItemsInFlight,
  ] = useMutation<AppClearBoughtItemsMutation>(clearBoughtItemsMutation);

  const clearBoughtItems = () => {
    commitClearBoughtItems({
      variables: {},

      onCompleted: (
        response: AppClearBoughtItemsMutation["response"]) => {
        if (response.clearBoughtItems) {
          setItems((currentItems) =>
            currentItems.filter((item) => !item.bought)
          );
        }
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };

  return {
    clearBoughtItems,
    isClearBoughtItemsInFlight,
  };
}