/**
 * @generated SignedSource<<d6e903479af26749e2835d383491f0d2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
    "alias": null,
    "args": [
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
    "concreteType": "item_name",
    "kind": "LinkedField",
    "name": "updateItem",
    "plural": false,
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
    "storageKey": null
  }
];
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
    "selections": (v3/*:: as any*/),
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
    "selections": (v3/*:: as any*/)
  },
  "params": {
    "cacheID": "8a7883b8487b7e47e46dd2bd536a4704",
    "id": null,
    "metadata": {},
    "name": "AppUpdateItemMutation",
    "operationKind": "mutation",
    "text": "mutation AppUpdateItemMutation(\n  $itemID: Int!\n  $itemName: String!\n  $categoryID: Int!\n) {\n  updateItem(itemID: $itemID, itemName: $itemName, categoryID: $categoryID) {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "53e126ab4621122f6280406981ff7257";

export default node;
