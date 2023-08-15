import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, ListGroup } from "react-bootstrap";

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
        <Container>
          <h1> Joke Generator </h1>
          <Card>
            <Card.Title>The Joke of the Day is...</Card.Title>
            <Card.Body>{mappedJokes}</Card.Body>
          </Card>
          <Button onClick={btnHandler}>Give me another joke</Button>
        </Container>
      </header>
    </div>
  );
}

export default App;
