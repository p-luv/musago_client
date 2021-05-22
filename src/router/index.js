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
            <PrivateRoute path="/signin" component={Pages.SignIn} />
            <PrivateRoute path="/signup/:id" component={Pages.SignUp} />
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
