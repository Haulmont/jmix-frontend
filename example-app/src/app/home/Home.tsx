import { gql, useQuery } from "@apollo/client";
import { Result, Spin } from "antd";
import React from "react";
import "./Home.css";

const QUERY = gql`
  query {
    __schema {
      queryType {
        fields {
          name
        }
      }
    }
  }
`;

export const Home = () => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) {
    return <Spin />;
  }

  if (error != null) {
    return (
      <Result status="error" title="Query failed" subTitle={error.message} />
    );
  }

  return (
    <>
      <h2>Welcome home!</h2>
      <p>
        <strong>Example query result:</strong>
      </p>
      <pre className="home-example-query">{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};
