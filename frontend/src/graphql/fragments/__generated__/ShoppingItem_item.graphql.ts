/**
 * @generated SignedSource<<54f43ed3e5fa0f176de67dc8438570a1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShoppingItem_item$data = {
  readonly bought: boolean;
  readonly category: {
    readonly categoryID: number;
    readonly categoryName: string;
  };
  readonly itemID: number;
  readonly itemName: string;
  readonly " $fragmentType": "ShoppingItem_item";
};
export type ShoppingItem_item$key = {
  readonly " $data"?: ShoppingItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShoppingItem_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShoppingItem_item",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bought",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "categoryID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "categoryName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "item_name",
  "abstractKey": null
};

(node as any).hash = "b8b5eb2738ce1948d5c429940cc49bab";

export default node;
