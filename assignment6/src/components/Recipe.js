import { Col, Card } from 'react-bootstrap';
import Ingredients from './Ingredients';

function Recipe(props) {
  return (
    <>
      <Col>
        <Card>
          <Card.Title>
            <p>{props.recipe.name}</p></Card.Title>
          <Card.Body>
            <Ingredients ingredients={props.recipe.ingredients} />
          </Card.Body>
          <Card.Footer>
            <span className='text-muted'>by {props.recipe.author.first_name} {props.recipe.author.last_name}</span>
            <span className='text-muted fst-italic'> (in {props.recipe.category.name})</span>
          </Card.Footer>

        </Card>
      </Col>
    </>
  )
}

export default Recipe;