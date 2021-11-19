import { Container, Toast, ToastContainer } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import { MerchantHome } from './pages/Merchant'
import { ClientHome } from './pages/Client'
import { Owner } from './pages/Owner'
import { closeNotitfication } from './redux/appSlice'

function PrivateRoute({ children, path }) {
  const { connected } = useSelector(state => {
    return state.web3
  })
  return <Route path={path} render={() => {
    const ele = connected === true
      ? children
      : <Redirect to={{ path: '/' }} />
    return ele
  }} />;
}

const NotificationCenter = () => {
  const { notification } = useSelector(state => state.app)
  const dispatch = useDispatch()

  const onHide = () => dispatch(closeNotitfication())

  const truncate = (str, len) => str.length > len ? str.substring(0, len) + '...' : str

  return <ToastContainer position="top-end">
    <Toast onClose={onHide} show={notification.show} animation={false} bg={notification.type}>
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto">{notification.title}</strong>
      </Toast.Header>
      <Toast.Body>{truncate(notification.message, 200)}</Toast.Body>
    </Toast>
  </ToastContainer>
}


function App() {
  return (

    <Container>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute exact path="/merchant">
            <MerchantHome />
          </PrivateRoute>
          <PrivateRoute exact path="/client">
            <ClientHome />
          </PrivateRoute>
          <PrivateRoute exact path="/owner">
            <Owner />
          </PrivateRoute>
        </Switch>
      </Router>
      <NotificationCenter />
    </Container>
  );
}

export default App
