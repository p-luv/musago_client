import './index.scss';
import { AuthProvider } from './../contexts/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import * as Pages from '../pages';
import DefaultLayout from '../layouts/DefaultLayout';

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
                <PrivateRoute path="/" component={Pages.Map} />
              </DefaultLayout>
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
