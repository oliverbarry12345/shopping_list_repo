/**
 * @generated SignedSource<<14d922779b4c158bf88ba9b171c3ed93>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AppUpdateItemMutation$variables = {
  categoryID: number;
  itemID: number;
  itemName: string;
};
export type AppUpdateItemMutation$data = {
  readonly updateItem: {
    readonly bought: boolean;
    readonly category: {
      readonly categoryID: number;
      readonly categoryName: string;
    };
    readonly itemID: number;
    readonly itemName: string;
    readonly " $fragmentSpreads": FragmentRefs<"ShoppingItem_item">;
  };
};
export type AppUpdateItemMutation = {
  response: AppUpdateItemMutation$data;
  variables: AppUpdateItemMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categoryID"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "itemID"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "itemName"
},
v3 = [
  {
    "kind": "Variable",
    "name": "categoryID",
    "variableName": "categoryID"
  },
  {
    "kind": "Variable",
    "name": "itemID",
    "variableName": "itemID"
  },
  {
    "kind": "Variable",
    "name": "itemName",
    "variableName": "itemName"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bought",
  "storageKey": null
},
v7 = {
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
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/),
      (v2/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppUpdateItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*:: as any*/),
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "updateItem",
        "plural": false,
        "selections": [
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/),
          (v7/*:: as any*/),
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
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v2/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "AppUpdateItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*:: as any*/),
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "updateItem",
        "plural": false,
        "selections": [
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/),
          (v7/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8954705eadf4d345e623e63ad7cc1c4b",
    "id": null,
    "metadata": {},
    "name": "AppUpdateItemMutation",
    "operationKind": "mutation",
    "text": "mutation AppUpdateItemMutation(\n  $itemID: Int!\n  $itemName: String!\n  $categoryID: Int!\n) {\n  updateItem(itemID: $itemID, itemName: $itemName, categoryID: $categoryID) {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n    ...ShoppingItem_item\n  }\n}\n\nfragment ShoppingItem_item on item_name {\n  itemID\n  itemName\n  bought\n  category {\n    categoryID\n    categoryName\n  }\n}\n"
  }
};
})();

(node as any).hash = "d055dcdf57b859c6cb36f1aa5d6b08e0";

export default node;
