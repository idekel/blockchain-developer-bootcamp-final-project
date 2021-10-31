import { Container } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import { MerchantHome } from './pages/Merchant'
import { ClientHome} from './pages/Client'


function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/merchant">
            <MerchantHome />
          </Route>
          <Route exact path="/client">
            <ClientHome />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App
