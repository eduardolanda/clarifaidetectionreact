import React, { useEffect, useState } from "react";
import clarifai from "clarifai";
import { BrowserRouter as Router } from "react-router-dom";
import { key } from "./apikey";
//Style
import { Input, List, Container, Image, Grid, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
//Components
import MenuBar from "./components/MenuBar";
import ListItems from "./components/ListItems";

function App() {
  const app = new clarifai.App({
    apiKey: key
  });

  const [url, setUrl] = useState("https://source.unsplash.com/featured?movie");
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(false);

  useEffect(() => {
    app.models
      .predict(clarifai.GENERAL_MODEL, { url })
      .then(response => {
        setData(response.outputs[0].data.concepts);
      })
      .catch(err => {
        console.log(err);
      });
  }, [url]);

  return (
    <Router>
      <Container>
        <MenuBar />
        {title ? (
          <Header as="h1" className="Title">
            {title}
          </Header>
        ) : (
          <Header as="h1" className="Title">
            Type a word or copy an image link
          </Header>
        )}

        <Grid centered>
          <Grid.Row>
            <Input
              placeholder="Word Or Link"
              onKeyPress={e =>
                e.key === "Enter"
                  ? e.target.value.length < 10
                    ? setUrl(
                        `https://source.unsplash.com/featured?${e.target.value}`
                      ) & setTitle(e.target.value)
                    : setUrl(e.target.value)
                  : ""
              }
            />
          </Grid.Row>
          <Grid.Row>
            <Image src={url} size="medium" wrapped className="image" circular />
          </Grid.Row>
        </Grid>
        <List divided relaxed style={{ margin: "16px", paddingBottom: "30px" }}>
          <List.Header className="Title">Category</List.Header>
          {data ? (
            data.map(x => (
              <ListItems key={x.id} name={x.name} value={x.value} />
            ))
          ) : (
            <h2>Loading</h2>
          )}
        </List>
      </Container>
    </Router>
  );
}

export default App;
