import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import CharacterSelect from './components/CharacterSelect';
import GameBoard from './components/Gameboard';
import ResultsScreen from './components/ResultsScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/select" element={<CharacterSelect />} />
        <Route path="/game/:character" element={<GameBoard />} />
        <Route path="/results" element={<ResultsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;