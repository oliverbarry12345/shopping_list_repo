/**
 * @generated SignedSource<<f8f01029ba3399614b7dc6e834fd45af>>
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
    readonly category: {
      readonly categoryID: number;
      readonly categoryName: string;
    };
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
    "cacheID": "9cb45115fe916a729dde1b997e08bed4",
    "id": null,
    "metadata": {},
    "name": "AppToggleBoughtMutation",
    "operationKind": "mutation",
    "text": "mutation AppToggleBoughtMutation(\n  $itemID: Int!\n  $bought: Boolean!\n) {\n  toggleBought(itemID: $itemID, bought: $bought) {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c1dc500bd2660278223f13597c581418";

export default node;
