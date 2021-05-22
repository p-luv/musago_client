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
import FullSizeLayout from '../layouts/FullSizeLayout';
import DefaultLayout from '../layouts/DefaultLayout'

function App() {

  return (
    <div className="App">
      <div className="wrap">
        <AuthProvider>
          <Router>
            <Switch>
            <Route path="/signin" component={Pages.SignIn} />
            <Route path="/signup/:id" component={Pages.SignUp} />
            <DefaultLayout>
            </DefaultLayout>
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
