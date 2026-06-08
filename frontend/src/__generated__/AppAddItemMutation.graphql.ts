/**
 * @generated SignedSource<<d1f1541ffb46ce67cf532e4ae54ae2b5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppAddItemMutation$variables = {
  category: string;
  itemName: string;
};
export type AppAddItemMutation$data = {
  readonly addItem: {
    readonly bought: boolean;
    readonly category: string;
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
  "name": "category"
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
        "name": "category",
        "variableName": "category"
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
    "cacheID": "b2bef4e1b4f06422901b97e5d93066d2",
    "id": null,
    "metadata": {},
    "name": "AppAddItemMutation",
    "operationKind": "mutation",
    "text": "mutation AppAddItemMutation(\n  $itemName: String!\n  $category: String!\n) {\n  addItem(itemName: $itemName, category: $category) {\n    itemID\n    itemName\n    bought\n    category\n  }\n}\n"
  }
};
})();

(node as any).hash = "3fef801c74262f8f31ed97eeeaa8bb92";

export default node;
