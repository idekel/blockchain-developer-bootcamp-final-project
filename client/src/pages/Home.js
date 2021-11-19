import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col } from 'react-bootstrap'
import { connectToMetaMask } from '../redux/web3Slice'
import './App.scss'
import { Link } from 'react-router-dom'

function UserSelector() {
    return <Row>
        <Col md={4}>
            <div className="clientButoon">
                <Link to="/merchant">Merchant</Link>
            </div>
            <div className="clientButoon">
                <Link to="/client">Client</Link>
            </div>
            <div className="clientButoon">
                <Link to="/owner">Owner</Link>
            </div>
        </Col>
    </Row>
}

const Home = () => {
    const dispatch = useDispatch();
    const { connected } = useSelector(state => {
        return state.web3
    })

    let child = <Row>
        <Col md={3}>
            <Button onClick={() => dispatch(connectToMetaMask())}>Connecto to meta mask</Button>
        </Col>
    </Row>

    if (connected) {
        child = <UserSelector></UserSelector>
    }

    return <div className="AppContainer">{child}</div>;

}

export default Home;