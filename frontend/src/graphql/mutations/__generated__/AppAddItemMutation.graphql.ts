/**
 * @generated SignedSource<<7601df2077d9a19d60264d7da5bafe25>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
    readonly " $fragmentSpreads": FragmentRefs<"ShoppingItem_item">;
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
    "name": "AppAddItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "addItem",
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
    "name": "AppAddItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "addItem",
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
    "cacheID": "04c4193defe9c8772559151bc22eb6cb",
    "id": null,
    "metadata": {},
    "name": "AppAddItemMutation",
    "operationKind": "mutation",
    "text": "mutation AppAddItemMutation(\n  $itemName: String!\n  $categoryID: Int!\n) {\n  addItem(itemName: $itemName, categoryID: $categoryID) {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n    ...ShoppingItem_item\n  }\n}\n\nfragment ShoppingItem_item on item_name {\n  itemID\n  itemName\n  bought\n  category {\n    categoryID\n    categoryName\n  }\n}\n"
  }
};
})();

(node as any).hash = "19245026776c65b46c4f360a506533a8";

export default node;
