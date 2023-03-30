import { Button } from 'react-bootstrap';

function CalculatorButton(props) {
  return (
    <Button onClick={props.clickHandler}>{props.text}</Button>
  );
}

export default CalculatorButton;