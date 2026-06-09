/**
 * @generated SignedSource<<65a77680feac26b6bb0ef5704a9ad987>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppUpdateItemMutation$variables = {
  category: string;
  itemID: number;
  itemName: string;
};
export type AppUpdateItemMutation$data = {
  readonly updateItem: {
    readonly bought: boolean;
    readonly category: string;
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
  "name": "category"
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
        "name": "category",
        "variableName": "category"
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
        "kind": "ScalarField",
        "name": "category",
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
    "cacheID": "b6c319b47c2e1c5064aa2c8a6fef7d49",
    "id": null,
    "metadata": {},
    "name": "AppUpdateItemMutation",
    "operationKind": "mutation",
    "text": "mutation AppUpdateItemMutation(\n  $itemID: Int!\n  $itemName: String!\n  $category: String!\n) {\n  updateItem(itemID: $itemID, itemName: $itemName, category: $category) {\n    itemID\n    itemName\n    bought\n    category\n  }\n}\n"
  }
};
})();

(node as any).hash = "9a798261ab5e0a34c3dcda6a1cd00504";

export default node;
