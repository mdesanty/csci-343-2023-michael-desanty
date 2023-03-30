import { ListGroup } from "react-bootstrap";

function Ingredients(props) {
  return (
    <ListGroup variant='flush'>
      {props.ingredients.map(ingredient => (
        <ListGroup.Item key={ingredient.name}>{ingredient.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Ingredients;