import React from "react";
import { List } from "semantic-ui-react";

export default function ListItems({ name, value }) {
  return (
    <>
      <List.Item>
        <List.Icon name="hand spock" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header className="Title">{name}</List.Header>
          <List.Description>{value.toFixed(2) * 100}%</List.Description>
        </List.Content>
      </List.Item>
    </>
  );
}
