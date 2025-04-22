import UnicornsModule from './layouts/unicorns';
import { UnicornProvider } from './context/UnicornContext';
import ObjectsModule from './layouts/objects';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <UnicornProvider>
        <UnicornsModule />
      </UnicornProvider>
      <ObjectsModule />
    </Fragment>
  );
}

export default App;