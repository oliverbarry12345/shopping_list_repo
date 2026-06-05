/**
 * @generated SignedSource<<1761a4e480f8bc02c28501bc9d19fe69>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type shoppingList_item$data = {
  readonly bought: boolean;
  readonly category: string;
  readonly itemID: number;
  readonly itemName: string;
  readonly " $fragmentType": "shoppingList_item";
};
export type shoppingList_item$key = {
  readonly " $data"?: shoppingList_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"shoppingList_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "shoppingList_item",
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
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    }
  ],
  "type": "item_name",
  "abstractKey": null
};

(node as any).hash = "0f0d86a4b2a369757321c63769b3153a";

export default node;
