import { commitMutation } from "react-relay";
import type { Environment } from "relay-runtime";
import type { Item } from "../types/shoppingTypes";
import { clearBoughtItemsMutation } from "../graphql/mutations/clearBoughtItemsMutation";

type ClearBoughtItemsArgs = {
    environment: Environment;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export function createClearBoughtItemsHandler({
    environment,
    setItems,
}: ClearBoughtItemsArgs) {

    return function clearBoughtItems() {

        commitMutation(environment, {
            mutation: clearBoughtItemsMutation,
            variables: {},

            onCompleted: (response: any) => {

                if (response.clearBoughtItems) {

                    setItems(currentItems =>
                        currentItems.filter(item => !item.bought)
                    );

                }
            },

            onError: error => {
                console.error(error);
            },
        });

    };
}