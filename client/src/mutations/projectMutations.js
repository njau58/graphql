import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
    $startDate: String!
    $dueDate: String!
  ) {
    addProject(
      startDate: $startDate
      dueDate: $dueDate
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      startDate
      dueDate
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
    $startDate: String!
    $dueDate: String!
  ) {
    updateProject(
      startDate: $startDate
      dueDate: $dueDate
      name: $name
      description: $description
      status: $status
      id: $id
    ) {
      id
      name
      description
      status
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

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
