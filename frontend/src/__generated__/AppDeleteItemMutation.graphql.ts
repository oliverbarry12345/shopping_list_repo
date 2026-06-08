/**
 * @generated SignedSource<<392d5225a4288ae996f1b33c17b24cdb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppDeleteItemMutation$variables = {
  itemID: number;
};
export type AppDeleteItemMutation$data = {
  readonly deleteItem: boolean;
};
export type AppDeleteItemMutation = {
  response: AppDeleteItemMutation$data;
  variables: AppDeleteItemMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "itemID"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "itemID",
        "variableName": "itemID"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteItem",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppDeleteItemMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "AppDeleteItemMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "d8bbe8cd3ef3ce8de1b69140924dfbc7",
    "id": null,
    "metadata": {},
    "name": "AppDeleteItemMutation",
    "operationKind": "mutation",
    "text": "mutation AppDeleteItemMutation(\n  $itemID: Int!\n) {\n  deleteItem(itemID: $itemID)\n}\n"
  }
};
})();

(node as any).hash = "0fa91f0393bc63a9fb27cf4b1688a5fd";

export default node;
