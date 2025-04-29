import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import UnicornsModule from './layouts/unicorns';
import { UnicornProvider } from './context/UnicornContext';
/* import ProductsModule from './layouts/products'; */
import { Fragment } from 'react';

function App() {
  return (
    <BrowserRouter>  {/* Envuelve tu App con el Router */}
        
        <UnicornProvider>
          <UnicornsModule />
        </UnicornProvider>

    </BrowserRouter>
  );
}

export default App;
