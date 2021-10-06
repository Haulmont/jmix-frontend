/* eslint-disable */
import * as graphql from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Get_Owner($id: Long) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n": graphql.Get_OwnerDocument,
    "\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n": graphql.Update_OwnerDocument,
    "\n              fragment New_OwnerDTO on OwnerDTO {\n                id\n              }\n            ": graphql.New_OwnerDtoFragmentDoc,
    "\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n": graphql.Get_Owner_ListDocument,
    "\n  mutation Delete_Owner($id: Long!) {\n    delete_Owner(id: $id)\n  }\n": graphql.Delete_OwnerDocument,
    "\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n": graphql.Get_Pet_ListDocument,
    "\n  mutation Delete_Pet($id: Long!) {\n    delete_Pet(id: $id)\n  }\n": graphql.Delete_PetDocument,
    "\n  query Get_Pet($id: Long) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n": graphql.Get_PetDocument,
    "\n  mutation Update_Pet($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n": graphql.Update_PetDocument,
    "\n              fragment New_PetDTO on PetDTO {\n                id\n              }\n            ": graphql.New_PetDtoFragmentDoc,
};

export function gql(source: "\n  query Get_Owner($id: Long) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n"): (typeof documents)["\n  query Get_Owner($id: Long) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n"];
export function gql(source: "\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n"];
export function gql(source: "\n              fragment New_OwnerDTO on OwnerDTO {\n                id\n              }\n            "): (typeof documents)["\n              fragment New_OwnerDTO on OwnerDTO {\n                id\n              }\n            "];
export function gql(source: "\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n"): (typeof documents)["\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n"];
export function gql(source: "\n  mutation Delete_Owner($id: Long!) {\n    delete_Owner(id: $id)\n  }\n"): (typeof documents)["\n  mutation Delete_Owner($id: Long!) {\n    delete_Owner(id: $id)\n  }\n"];
export function gql(source: "\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(source: "\n  mutation Delete_Pet($id: Long!) {\n    delete_Pet(id: $id)\n  }\n"): (typeof documents)["\n  mutation Delete_Pet($id: Long!) {\n    delete_Pet(id: $id)\n  }\n"];
export function gql(source: "\n  query Get_Pet($id: Long) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query Get_Pet($id: Long) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(source: "\n  mutation Update_Pet($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Update_Pet($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n"];
export function gql(source: "\n              fragment New_PetDTO on PetDTO {\n                id\n              }\n            "): (typeof documents)["\n              fragment New_PetDTO on PetDTO {\n                id\n              }\n            "];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
