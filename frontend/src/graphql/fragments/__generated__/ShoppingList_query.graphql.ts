/**
 * @generated SignedSource<<f60cfa2cec0aaf7f233b1bee624da72d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShoppingList_query$data = {
  readonly items: ReadonlyArray<{
    readonly bought: boolean;
    readonly category: {
      readonly categoryID: number;
      readonly categoryName: string;
    };
    readonly itemID: number;
    readonly itemName: string;
    readonly " $fragmentSpreads": FragmentRefs<"ShoppingItem_item">;
  }>;
  readonly " $fragmentType": "ShoppingList_query";
};
export type ShoppingList_query$key = {
  readonly " $data"?: ShoppingList_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShoppingList_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShoppingList_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "item_name",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ShoppingItem_item"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "f0953a395552869d93333ae849fe6012";

export default node;
