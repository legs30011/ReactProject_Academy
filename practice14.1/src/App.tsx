import CharacterCounter from './components/CharacterCounter';
import SimpleForm from './components/SimpleForm';
import LazyModalDemo from './components/LazyModalDemo';
import './App.css';

function App() {
  return (
    <div className="p-8 space-y-8">
      <CharacterCounter />
      <SimpleForm />
      <LazyModalDemo />
    </div>
  );
}

export default App;