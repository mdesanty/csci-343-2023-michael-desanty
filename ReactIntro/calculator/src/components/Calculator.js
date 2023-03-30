import { useRef, useState } from 'react';
import CalculatorButton from './CalculatorButton';

import { Form } from 'react-bootstrap';

function Calculator(props) {
  const x = useRef(null);
  const y = useRef(null);
  const [result, setResult] = useState('');

  function add(e) {
    e.preventDefault();

    const xValue = parseFloat(x.current.value);
    const yValue = parseFloat(y.current.value);

    setResult(xValue + yValue);
  }

  function subtract(e) {
    e.preventDefault();

    const xValue = parseFloat(x.current.value);
    const yValue = parseFloat(y.current.value);

    setResult(xValue - yValue);
  }

  function clear(e) {
    e.preventDefault();
    x.current.value = '';
    y.current.value = '';
    setResult('');
  }

  return (
    <div id='calculator'>
      <h3>{props.title}</h3>
      <Form>
        <Form.Group>
          <Form.Label>First number (x)</Form.Label>
          <Form.Control type='number' ref={x} placeholder='Enter a number'></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Second number (y)</Form.Label>
          <Form.Control type='number' ref={y} placeholder='Enter a number'></Form.Control>
        </Form.Group>
        <Form.Group>
          <CalculatorButton text='Add' clickHandler={add} />
          <CalculatorButton text='Subtract' clickHandler={subtract} />
          <CalculatorButton text='Clear' clickHandler={clear} />
        </Form.Group>
      </Form>
      <div id='result'>
        <span>Result: <span id='result-value'>{result}</span></span>
      </div>
    </div>
  );
}

export default Calculator;