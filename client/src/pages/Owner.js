import { useEffect, useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getContractFee, setContractFee } from '../redux/web3Slice'
import { sendNotification, setIsLoading } from '../redux/appSlice'
import Web3 from 'web3'

export const Owner = () => {
    const dispatch = useDispatch()
    const [fee, setFee] = useState(0)
    const [currentFee, setCurrentFee] = useState(0)
    const isLoading = useSelector(state => state.app.isLoading)

    const loadCurrentFee = async () => {
        const ret = await dispatch(getContractFee())
        setCurrentFee(ret.payload)
    }

    useEffect(loadCurrentFee)

    const sendNewFee = async () => {
        dispatch(setIsLoading(true))
        const ret = await dispatch(setContractFee(fee))
        if (ret.payload) {
            loadCurrentFee()
            dispatch(sendNotification({ message: `Trasanction successful.`, title: 'Success' }))
        } else {
            dispatch(sendNotification({ message: `Trasanction failed. Only onwer can set contract fee`, title: 'Error', type: 'danger' }))
        }
        dispatch(setIsLoading(false))
    }

    return <>
        <Row>
            <Col>
                <h3>Current Contract fee: {currentFee} Basis points</h3>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>Contract Fee</Form.Label>
                    <Form.Control type="text" value={fee} onChange={e => setFee(e.target.value)} />
                </Form.Group>
            </Col>
        </Row>
        <br />
        <Row>
            <Col>
                <Button disabled={isLoading} onClick={sendNewFee}>Send</Button>
            </Col>
        </Row>
    </>
}