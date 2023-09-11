import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';

// project imports
import App from './App';

// style + assets
import './assets/scss/style.scss';
import 'rsuite/dist/rsuite.min.css';
import config from './config';
import { Provider } from 'react-redux';
import { store } from './store';

// ==============================|| REACT DOM RENDER  ||============================== /

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    </Provider>
);
