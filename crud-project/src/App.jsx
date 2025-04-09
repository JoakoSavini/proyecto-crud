// src/App.jsx
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // o el tema que uses
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import UnicornContainer from './unicorns';

function App() {
  return (
    <div className="App">
      <UnicornContainer />
    </div>
  );
}

export default App;
