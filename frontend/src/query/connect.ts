import { gql } from "@apollo/client";

export const CONNECT_REQUEST_MUTATION = gql`
  mutation ConnectRequest($id: String!, $text:String!) {
    createRequest(user_id: $id, text :$text)
  }
`;

export const IGNORE_REQUEST_MUTATION = gql`
  mutation IgnoreRequest($id: String!) {
    declineRequest(id: $id)
  }
`;

export const ACCEPT_REQUEST_MUTATION = gql`
  mutation AcceptRequest($id: String!) {
    acceptRequest(id: $id)
  }
`;

export const CANCEL_REQUEST_MUTATION = gql`
  mutation RemoveRequest($id: String!, $target: String!) {
    removeRequest(id: $id, target: $target)
  }
`;