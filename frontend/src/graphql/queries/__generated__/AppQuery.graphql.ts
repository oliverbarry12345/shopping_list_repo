/**
 * @generated SignedSource<<528083784b99c7dd99dfbd18af55b90d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppQuery$variables = Record<PropertyKey, never>;
export type AppQuery$data = {
  readonly categories: ReadonlyArray<{
    readonly categoryID: number;
    readonly categoryName: string;
  }>;
  readonly items: ReadonlyArray<{
    readonly bought: boolean;
    readonly category: {
      readonly categoryID: number;
      readonly categoryName: string;
    };
    readonly itemID: number;
    readonly itemName: string;
  }>;
};
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = [
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
        "selections": (v0/*:: as any*/),
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
    "selections": (v0/*:: as any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": (v1/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "8de1c5a31a5fc3c5a442b6fca7cbb61e",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  items {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n  }\n  categories {\n    categoryID\n    categoryName\n  }\n}\n"
  }
};
})();

(node as any).hash = "b44fe7a81b223763176a702573d9d1af";

export default node;
