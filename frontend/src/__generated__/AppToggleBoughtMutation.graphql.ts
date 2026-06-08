/**
 * @generated SignedSource<<7001af71394751e7c09a3b724505fab6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppToggleBoughtMutation$variables = {
  bought: boolean;
  itemID: number;
};
export type AppToggleBoughtMutation$data = {
  readonly toggleBought: {
    readonly bought: boolean;
    readonly category: string;
    readonly itemID: number;
    readonly itemName: string;
  };
};
export type AppToggleBoughtMutation = {
  response: AppToggleBoughtMutation$data;
  variables: AppToggleBoughtMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "bought"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "itemID"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "bought",
        "variableName": "bought"
      },
      {
        "kind": "Variable",
        "name": "itemID",
        "variableName": "itemID"
      }
    ],
    "concreteType": "item_name",
    "kind": "LinkedField",
    "name": "toggleBought",
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
    "name": "AppToggleBoughtMutation",
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
    "name": "AppToggleBoughtMutation",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "2e8b2f2fc845b6971554f00785520be6",
    "id": null,
    "metadata": {},
    "name": "AppToggleBoughtMutation",
    "operationKind": "mutation",
    "text": "mutation AppToggleBoughtMutation(\n  $itemID: Int!\n  $bought: Boolean!\n) {\n  toggleBought(itemID: $itemID, bought: $bought) {\n    itemID\n    itemName\n    bought\n    category\n  }\n}\n"
  }
};
})();

(node as any).hash = "b68819e7c2ef59f389829988326421e2";

export default node;
