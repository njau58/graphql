import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      createdAt
      updatedAt
      status
      startDate
      dueDate
      client{
        id
        name,
        email,
        phone
  
  }
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      createdAt
      updatedAt
      startDate
      dueDate
      client {
        id
        name
        email
        phone
      }
    }
  }
`;



export { GET_PROJECTS, GET_PROJECT };
