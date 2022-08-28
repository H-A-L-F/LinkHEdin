import { gql } from "@apollo/client"

export const CREATE_EXPERIENCE_MUTATION = gql`
  mutation CreateExperience($UserID:String!, $Title:String!, $EmploymentType:String!, $CompanyName:String!, $Location:String!, $Active:Boolean!, $StartYear:String!, $EndYear:String!, $Industry:String!, $Description:String!){
    createExperience(input:{
      UserID:$UserID,
      Title:$Title,
      EmploymentType:$EmploymentType,
      CompanyName:$CompanyName,
      Location:$Location,
      Active:$Active,
      StartYear:$StartYear,
      EndYear:$EndYear,
      Industry:$Industry,
      Description:$Description
    })
  }
`

export const USER_EXPERIENCE_QUERY = gql`
  query getUserExperience($UserID:ID!){
    userExperience(userID:$UserID){
      ID,
      UserID,
      Title,
      EmploymentType,
      CompanyName,
      Location,
      Active,
      StartYear,
      EndYear,
      Industry,
      Description
    }
  }
`
export const DELETE_EXPERIENCE_MUTATION = gql`
  mutation deleteExperience($id:ID!){
    deleteExperience(id:$id)
  }
`

export const UPDATE_EXPERIENCE_MUTATION = gql`
  mutation updateExperience($id:ID!,$UserID:String!,$Title:String!, $EmploymentType:String!, $CompanyName:String!, $Location:String!, $Active:Boolean!, $StartYear:String!, $EndYear:String!, $Industry:String!, $Description:String!){
    updateExperience(id:$id, input:{
      UserID:$UserID
      Title:$Title,
      EmploymentType:$EmploymentType,
      CompanyName:$CompanyName,
      Location:$Location,
      Active:$Active,
      StartYear:$StartYear,
      EndYear:$EndYear,
      Industry:$Industry,
      Description:$Description
    })
  }
`