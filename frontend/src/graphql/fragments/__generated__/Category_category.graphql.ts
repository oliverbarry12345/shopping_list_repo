/**
 * @generated SignedSource<<7b0ad09f2ea3f7e677458fd692c19416>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Category_category$data = ReadonlyArray<{
  readonly categoryID: number;
  readonly categoryName: string;
  readonly " $fragmentType": "Category_category";
}>;
export type Category_category$key = ReadonlyArray<{
  readonly " $data"?: Category_category$data;
  readonly " $fragmentSpreads": FragmentRefs<"Category_category">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Category_category",
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
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "0cd096706b96d97bb9fb2aa69df27584";

export default node;
