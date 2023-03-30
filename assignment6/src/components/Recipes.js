import { Container, Row } from "react-bootstrap";
import Recipe from "./Recipe";

function Recipes() {
  const recipes = [
    {
      name: 'Chicken Parm',
      author:
      {
        first_name: 'Gordan',
        last_name: 'Ramsey'
      },
      ingredients:
        [
          { name: 'Chicken' },
          { name: 'Sauce' },
          { name: 'Cheese' }
        ],
      category:
      {
        name: 'Itaian'
      }
    },
    {
      name: 'Tacos',
      author:
      {
        first_name: 'Wolfgang',
        last_name: 'Puck'
      },
      ingredients:
        [
          { name: 'Taco shells' },
          { name: 'Cheese' },
          { name: 'Beef' }
        ],
      category:
      {
        name: 'Tex Mex'
      }
    },
    {
      name: 'Ice Cream Sundae',
      author:
      {
        first_name: 'Bobby',
        last_name: 'Flay'
      },
      ingredients:
        [
          { name: 'Vanilla ice cream' },
          { name: 'Hot fudge' },
          { name: 'Whipped cream' }
        ],
      category:
      {
        name: 'Desserts'
      }
    }
  ];

  return(
    <>
      <Container>
        <Row>
          {recipes.map(recipe => (
            <Recipe key={recipe.name} recipe={recipe} />
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Recipes;