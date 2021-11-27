import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col } from 'react-bootstrap'
import { connectToMetaMask, initMetaMask } from '../redux/web3Slice'
import './App.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { setIsLoading } from '../redux/appSlice'

function UserSelector() {
    return <Row>
        <Col md={4}>
            <div className="clientButoon">
                <Link to="/blockchain-developer-bootcamp-final-project/merchant">Merchant</Link>
            </div>
            <div className="clientButoon">
                <Link to="/blockchain-developer-bootcamp-final-project/client">Client</Link>
            </div>
            <div className="clientButoon">
                <Link to="/blockchain-developer-bootcamp-final-project/owner">Owner</Link>
            </div>
        </Col>
    </Row>
}

const Home = () => {
    const dispatch = useDispatch();
    const { connected } = useSelector(state => {
        return state.web3
    })
    const isLoading = useSelector(state => state.app.isLoading)

    const doConnectToMetaMask = async () => {
        if (!connected) {
            dispatch(setIsLoading(true))
            try {
                await dispatch(connectToMetaMask())
            } finally {
                dispatch(setIsLoading(false))
            }
        }
    }

    useEffect(() => {
        dispatch(initMetaMask())
    }, [])

    let child = <Row>
        <Col md={3}>
            <Button onClick={doConnectToMetaMask}>Connecto to meta mask</Button>
        </Col>
    </Row>

    if (connected) {
        child = <UserSelector></UserSelector>
    } else if (isLoading) {
        child = <div>
            <h3>Connecting to metamask...</h3>
        </div>
    }

    return <div className="AppContainer">{child}</div>;

}

export default Home;