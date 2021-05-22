import './index.scss';
import { AuthProvider } from './../contexts/Auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import * as Pages from '../pages';

function App() {
  return (
    <div className="App">
      <div className="wrap">
        <AuthProvider>
          <Router>
            <Switch>
            {/* <PrivateRoute exact path="/" component={} /> */}
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
