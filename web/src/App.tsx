import React, { useState } from 'react';
import './App.css';

// import Header from './Header';
// import Home from './pages/home'; // Automaticamente busca o index dentro da pasta se omitir
import Routes from './routes';

function App() {
  // const [counter, setCounter] = useState(0); // retorna sempre um array [valor do estado, função pra atualizar o valor do estado]

  // function handleButtonClick(): void {
  //   setCounter(counter + 1);
  // }

  return (
    <Routes />
    // <div>
    //   <Header title="Título" />
    //   <Header title="Título2" />

    //   <h1>{counter}</h1>
    //   <h1>{counter * 2}</h1>
    //   <button type="button" onClick={handleButtonClick}>Aumentar</button>
    // </div>
  );
}

export default App;



// parei em 01:47:00 - aula 3
