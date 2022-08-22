import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const REGISTER_QUERY = gql`
  mutation Register($input: NewUser!) {
    register(input: $input)
  }
`;