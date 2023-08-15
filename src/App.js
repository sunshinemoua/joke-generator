import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

function App() {
  const [jokes, setJokes] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("https://official-joke-api.appspot.com/random_joke")
      .then((response) => {
        const data = response.data;
        setJokes([data]);
      })
      .catch((error) => console.log(error));
  }, [reload]);

  const mappedJokes = jokes.map((joke) => {
    return (
      <ListGroup key={joke.id}>
        <ListGroup.Item> {joke.setup} </ListGroup.Item>
        <ListGroup.Item> {joke.punchline} </ListGroup.Item>
      </ListGroup>
    );
  });

  const btnHandler = () => {
    setReload(!reload);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Joke Generator </h1>
        <Card>
          <Card.Title style={{ fontSize: "1rem", padding: "0.5rem" }}>
            Here is the Joke of the Day...
          </Card.Title>
          <Card.Body style={{ fontSize: "1.5rem" }}> {mappedJokes} </Card.Body>
        </Card>
        <Button onClick={btnHandler} style={{ margin: "1rem" }}>
          Give me another joke
        </Button>
      </header>
    </div>
  );
}

export default App;
