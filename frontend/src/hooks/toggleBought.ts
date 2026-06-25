import { commitMutation } from "react-relay";
import type { Environment } from "relay-runtime";
import type { Item } from "../types/shoppingTypes";
import { toggleBoughtMutation } from "../graphql/mutations/toggleBoughtMutation";

type ToggleBoughtArgs = {
    environment: Environment;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export function createToggleBoughtHandler({
    environment,
    setItems,
}: ToggleBoughtArgs) {

    return function toggleBought(
        itemID: number,
        bought: boolean
    ) {

        commitMutation(environment, {
            mutation: toggleBoughtMutation,
            variables: {
                itemID,
                bought,
            },

            onCompleted: (response: any) => {

                const updatedItem: Item =
                    response.toggleBought;

                setItems(currentItems =>
                    currentItems.map(item =>
                        item.itemID === updatedItem.itemID
                            ? updatedItem
                            : item
                    )
                );
            },

            onError: error => {
                console.error(error);
            },
        });
    };
}