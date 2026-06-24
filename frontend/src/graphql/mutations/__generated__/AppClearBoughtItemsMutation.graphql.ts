/**
 * @generated SignedSource<<ccf253655ad71172c5c3b6b97cfbe848>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppClearBoughtItemsMutation$variables = Record<PropertyKey, never>;
export type AppClearBoughtItemsMutation$data = {
  readonly clearBoughtItems: boolean;
};
export type AppClearBoughtItemsMutation = {
  response: AppClearBoughtItemsMutation$data;
  variables: AppClearBoughtItemsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "clearBoughtItems",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppClearBoughtItemsMutation",
    "selections": (v0/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppClearBoughtItemsMutation",
    "selections": (v0/*:: as any*/)
  },
  "params": {
    "cacheID": "d5dcbf8fa692b3d2dc0fee0ecbe59a02",
    "id": null,
    "metadata": {},
    "name": "AppClearBoughtItemsMutation",
    "operationKind": "mutation",
    "text": "mutation AppClearBoughtItemsMutation {\n  clearBoughtItems\n}\n"
  }
};
})();

(node as any).hash = "b5b2828cb11581ba1f5ca03598dfec43";

export default node;
