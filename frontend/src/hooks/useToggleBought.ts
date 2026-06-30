import { useMutation } from "react-relay";
import { toggleBoughtMutation } from "../graphql/mutations/toggleBoughtMutation";
import type { AppToggleBoughtMutation } from "../graphql/mutations/__generated__/AppToggleBoughtMutation.graphql";

type ToggleBoughtArgs = {
  refreshQuery: () => void;
};

export function useToggleBought({ refreshQuery }: ToggleBoughtArgs) {
  const [commitToggleBought, isToggleBoughtInFlight] =
    useMutation<AppToggleBoughtMutation>(toggleBoughtMutation);

  const toggleBought = (itemID: number, bought: boolean) => {
    commitToggleBought({
      variables: {
        itemID,
        bought,
      },
      onCompleted: () => {
        refreshQuery();
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