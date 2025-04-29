import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import UnicornsModule from './layouts/unicorns';
import { UnicornProvider } from './context/UnicornContext';
import ProductsModule from './layouts/products';
import { Fragment } from 'react';

function App() {
  return (
    <BrowserRouter>  {/* Envuelve tu App con el Router */}
        <Fragment>

          <UnicornProvider>
            <UnicornsModule />
          </UnicornProvider>

          <ProductsModule />

        </Fragment>
    </BrowserRouter>
  );
}

export default App;
