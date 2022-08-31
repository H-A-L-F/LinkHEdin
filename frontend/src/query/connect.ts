import { gql } from "@apollo/client";

export const CONNECT_REQUEST_QUERY = gql`
  mutation ConnectRequest($id: String!) {
    createRequest(user_id: $id)
  }
`;
