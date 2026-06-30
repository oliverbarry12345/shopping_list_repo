import { useMutation } from "react-relay";
import { clearBoughtItemsMutation } from "../graphql/mutations/clearBoughtItemsMutation";
import type { AppClearBoughtItemsMutation } from "../graphql/mutations/__generated__/AppClearBoughtItemsMutation.graphql";

type ClearBoughtItemsArgs = {
  refreshQuery: () => void;
};

export function useClearBoughtItems({
  refreshQuery,
}: ClearBoughtItemsArgs) {

  const [
    commitClearBoughtItems,
    isClearBoughtItemsInFlight,
  ] = useMutation<AppClearBoughtItemsMutation>(clearBoughtItemsMutation);

  const clearBoughtItems = () => {
    commitClearBoughtItems({
      variables: {},

      onCompleted: () => {
        refreshQuery();
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