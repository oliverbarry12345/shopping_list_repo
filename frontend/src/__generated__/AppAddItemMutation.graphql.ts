/**
 * @generated SignedSource<<fbfccd5f2bb16bfd824614e2e4eb75da>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppAddItemMutation$variables = {
  categoryID: number;
  itemName: string;
};
export type AppAddItemMutation$data = {
  readonly addItem: {
    readonly bought: boolean;
    readonly category: {
      readonly categoryID: number;
      readonly categoryName: string;
    };
    readonly itemID: number;
    readonly itemName: string;
  };
};
export type AppAddItemMutation = {
  response: AppAddItemMutation$data;
  variables: AppAddItemMutation$variables;
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
  "name": "itemName"
},
v2 = [
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
        "name": "itemName",
        "variableName": "itemName"
      }
    ],
    "concreteType": "item_name",
    "kind": "LinkedField",
    "name": "addItem",
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
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppAddItemMutation",
    "selections": (v2/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "AppAddItemMutation",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "8c57ccde98a996ff44b6c94b2988501c",
    "id": null,
    "metadata": {},
    "name": "AppAddItemMutation",
    "operationKind": "mutation",
    "text": "mutation AppAddItemMutation(\n  $itemName: String!\n  $categoryID: Int!\n) {\n  addItem(itemName: $itemName, categoryID: $categoryID) {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "945f41da355f581b5f4a727d73a9e33c";

export default node;
