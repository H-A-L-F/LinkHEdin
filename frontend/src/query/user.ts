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

export const VALIDATE_USER_QUERY = gql`
  mutation ValidateUser($input: ValidReq!) {
    validateUser(input: $input)
  }
`;

export const REQ_CHANGE_PASS_QUERY = gql`
  mutation RequestChangePassword($email: String!) {
    requestChangePassword(email: $email)
  }
`;

export const VALIDATE_CHANGE_PASS_QUERY = gql`
  mutation ValidateChangePass($input: ValidChangePass!) {
    validateChangePass(input: $input)
  }
`;

export const CHANGE_PASS_QUERY = gql`
  mutation ChangePass($password: String!, $id: ID!) {
    changePassword(password: $password, id: $id)
  }
`;

export const USER_SUGGESTION_QUERY = gql`
  query UserMightKnow {
    userSuggestion {
      id
      name
      email
      PhotoProfile
      FollowedUser
      ConnectedUser
      RequestConnect
      RequestConnectTxt
      Headline
    }
  }
`;

export const UPDATE_USER_QUERY = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUser!) {
    updateUser(id: $id, input: $input) {
      name
      id
    }
  }
`;

export const USER_FETCH_QUERY = gql`
  query Fetch {
    whoisme {
      id
      name
      email
      FollowedUser
      PhotoProfile
      ConnectedUser
      RequestConnect
      BgPhotoProfile
      Headline
      ProfileViews
    }
  }
`;

export const FIND_USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      FollowedUser
      PhotoProfile
      ConnectedUser
      RequestConnect
      BgPhotoProfile
      Headline
      ProfileViews
    }
  }
`;

export const FOLLOW_USER_QUERY = gql`
  mutation Follow($id: ID!) {
    follow(id: $id)
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser {
    users {
      name
      id
      email
      PhotoProfile
      RequestConnectTxt
    }
  }
`

export const GET_CONNECTED_USER_QUERY = gql`
query GetConnetedUser{
  searchConnected{
    name
    email
    PhotoProfile
    FollowedUser
    ConnectedUser
    RequestConnect
    RequestConnectTxt
    Headline
    ProfileViews
    BgPhotoProfile
    BlockedUser
    id
  }
}
`
