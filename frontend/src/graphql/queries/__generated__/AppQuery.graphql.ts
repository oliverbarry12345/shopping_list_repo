/**
 * @generated SignedSource<<8b5b0aa7b928e1b17a91c95d1b0191e4>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AppQuery$variables = Record<PropertyKey, never>;
export type AppQuery$data = {
  readonly categories: ReadonlyArray<{
    readonly categoryID: number;
    readonly categoryName: string;
    readonly " $fragmentSpreads": FragmentRefs<"Category_category">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ShoppingList_query">;
};
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryName",
  "storageKey": null
},
v2 = [
  (v0/*:: as any*/),
  (v1/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ShoppingList_query"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "categories",
        "plural": true,
        "selections": [
          (v0/*:: as any*/),
          (v1/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Category_category"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "item_name",
        "kind": "LinkedField",
        "name": "items",
        "plural": true,
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
            "selections": (v2/*:: as any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "categories",
        "plural": true,
        "selections": (v2/*:: as any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1f3e0b27136661c6883a0fddb51feef5",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  ...ShoppingList_query\n  categories {\n    categoryID\n    categoryName\n    ...Category_category\n  }\n}\n\nfragment Category_category on Category {\n  categoryID\n  categoryName\n}\n\nfragment ShoppingItem_item on item_name {\n  itemID\n  itemName\n  bought\n  category {\n    categoryID\n    categoryName\n  }\n}\n\nfragment ShoppingList_query on Query {\n  items {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n    ...ShoppingItem_item\n  }\n}\n"
  }
};
})();

(node as any).hash = "26725b29153e70147da51a894aad489e";

export default node;
