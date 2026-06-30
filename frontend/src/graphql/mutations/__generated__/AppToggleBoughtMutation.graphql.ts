/**
 * @generated SignedSource<<d27ad4c629b254b0d9ee978f40ff1317>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
    readonly " $fragmentSpreads": FragmentRefs<"ShoppingItem_item">;
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bought",
  "storageKey": null
},
v6 = {
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
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppToggleBoughtMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "toggleBought",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/),
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
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "AppToggleBoughtMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "toggleBought",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7549229f8a9d7618d0899e74cd980858",
    "id": null,
    "metadata": {},
    "name": "AppToggleBoughtMutation",
    "operationKind": "mutation",
    "text": "mutation AppToggleBoughtMutation(\n  $itemID: Int!\n  $bought: Boolean!\n) {\n  toggleBought(itemID: $itemID, bought: $bought) {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n    ...ShoppingItem_item\n  }\n}\n\nfragment ShoppingItem_item on item_name {\n  itemID\n  itemName\n  bought\n  category {\n    categoryID\n    categoryName\n  }\n}\n"
  }
};
})();

(node as any).hash = "1fd5c209be67ccf8b5e1845d3fccb2a9";

export default node;
