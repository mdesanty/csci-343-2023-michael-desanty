import './App.css';
import Welcome from './components/Welcome';
import Description from './components/Description';

function App() {
  return (
    <>
      <Welcome message='Welcome to Full Stack Development' />
      <Description description='Where we implment them full stacks' />

      <Welcome message='Welcome to Data Structures' />
      <Description description='Where structure data' />
    </>
  );
}

export default App;
