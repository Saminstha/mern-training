import { useState } from 'react'
import Header from './components/header';
import CardGrid from "./components/CardGrid";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className="app">
      <Header />
      <CardGrid />
    </div>

  )
}

export default App;
