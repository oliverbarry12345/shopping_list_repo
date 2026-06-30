/**
 * @generated SignedSource<<bb6dbcd99aa38e1f3f001e5a0504cce5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FileItemInput = {
  categoryID: number;
  itemName: string;
};
export type AppAddItemsFromFileMutation$variables = {
  items: ReadonlyArray<FileItemInput>;
};
export type AppAddItemsFromFileMutation$data = {
  readonly addItemsFromFile: ReadonlyArray<{
    readonly bought: boolean;
    readonly category: {
      readonly categoryID: number;
      readonly categoryName: string;
    };
    readonly itemID: number;
    readonly itemName: string;
    readonly " $fragmentSpreads": FragmentRefs<"ShoppingItem_item">;
  }>;
};
export type AppAddItemsFromFileMutation = {
  response: AppAddItemsFromFileMutation$data;
  variables: AppAddItemsFromFileMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "items"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "items",
    "variableName": "items"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bought",
  "storageKey": null
},
v5 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppAddItemsFromFileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "addItemsFromFile",
        "plural": true,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShoppingItem_item"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "AppAddItemsFromFileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "addItemsFromFile",
        "plural": true,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f181e39484c7f3a1433317d4c51a2b20",
    "id": null,
    "metadata": {},
    "name": "AppAddItemsFromFileMutation",
    "operationKind": "mutation",
    "text": "mutation AppAddItemsFromFileMutation(\n  $items: [FileItemInput!]!\n) {\n  addItemsFromFile(items: $items) {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n    ...ShoppingItem_item\n  }\n}\n\nfragment ShoppingItem_item on item_name {\n  itemID\n  itemName\n  bought\n  category {\n    categoryID\n    categoryName\n  }\n}\n"
  }
};
})();

(node as any).hash = "7cb32f496bf3703bacc312780f9de4aa";

export default node;
