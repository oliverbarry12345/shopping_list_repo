/**
 * @generated SignedSource<<cbe9a2666676e625c46496f8b268ff0d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FileItemInput = {
  categoryID: number;
  itemName: string;
};
export type AppAddItemsFromFileMutation$variables = {
  items: ReadonlyArray<FileItemInput>;
};
export type AppAddItemsFromFileMutation$data = {
  readonly addItemsFromFile: ReadonlyArray<{
    readonly bought: boolean;
    readonly category: {
      readonly categoryID: number;
      readonly categoryName: string;
    };
    readonly itemID: number;
    readonly itemName: string;
  }>;
};
export type AppAddItemsFromFileMutation = {
  response: AppAddItemsFromFileMutation$data;
  variables: AppAddItemsFromFileMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "items"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "items",
        "variableName": "items"
      }
    ],
    "concreteType": "item_name",
    "kind": "LinkedField",
    "name": "addItemsFromFile",
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppAddItemsFromFileMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "AppAddItemsFromFileMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "5fbec5c4b750c85c376b8c56ceafb0d1",
    "id": null,
    "metadata": {},
    "name": "AppAddItemsFromFileMutation",
    "operationKind": "mutation",
    "text": "mutation AppAddItemsFromFileMutation(\n  $items: [FileItemInput!]!\n) {\n  addItemsFromFile(items: $items) {\n    itemID\n    itemName\n    bought\n    category {\n      categoryID\n      categoryName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d98800df57a3b697fac00932eae89af";

export default node;
