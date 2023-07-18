import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation register($email: String! $password: String!) {
    register(email: $email password: $password)
  }
`;

const LOGIN_USER = gql`
  mutation login($email: String! $password: String!) {
    login(email: $email password: $password)
  }
`;

export { REGISTER_USER, LOGIN_USER };
