import { gql } from "@apollo/client";

export const CREATE_EDUCATION_MUTATION = gql`
  mutation createEducation ($UserID:ID!, $School:String!, $Degree:String!, $FieldOfStudy:String!, $StartDate:String!, $EndDate:String!, $Grade:Float!, $Activities:String!, $Description:String!){
    createEducation(input:{
      UserID:$UserID,
      School:$School,
      Degree:$Degree,
      FieldOfStudy:$FieldOfStudy,
      StartDate:$StartDate,
      EndDate:$EndDate,
      Grade:$Grade,
      Activities:$Activities,
      Description:$Description
    })
  }
`

export const USER_EDUCATION_QUERY = gql`
  query getUserEducation($UserID:ID!){
    userEducation(userID:$UserID){
      ID,
      UserID,
      School,
      Degree,
      FieldOfStudy,
      StartDate,
      EndDate,
      Grade,
      Activities,
      Description
    }
  }
`

export const DELETE_EDUCATION_MUTATION = gql`
  mutation deleteEducation($id:String!){
    deleteEducation(id:$id)
  }
`