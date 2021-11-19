import { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { loadInvoice, listenForNewInvoices } from '../redux/web3Slice'
import { InvoiceDetail } from '../components/InvoiceDetail'
import { setIsLoading, sendNotification } from '../redux/appSlice'


export const ClientHome = () => {
    const dispatch = useDispatch()
    const [invoiceId, setInvoiceId] = useState(0)
    const [invoice, setInvoice] = useState(null)
    const isLoading = useSelector(state => state.app.isLoading)

    useEffect(() => {
        dispatch(listenForNewInvoices())
    }, [])

    const getInvoiceById = async () => {
        dispatch(setIsLoading(true))
        const ret = await dispatch(loadInvoice(invoiceId))
        setInvoice(ret.payload)
        dispatch(setIsLoading(false))
    }

    let invoiceModal = null
    if (invoice != null) {
        const onHide = (ret) => {
            setInvoice(null)
            if (ret){
                dispatch(sendNotification({ message: `Trasanction successful.`, title: 'Success' }))
            } else if (ret === false){
                dispatch(sendNotification({ message: `Trasanction failed.`, title: 'Error', type: 'danger' }))
            }
        }
        const args = { invoice, onHide }
        invoiceModal = <InvoiceDetail {...args} />
    }

    return <>
        <Row>
            <Col md={4}>
                <Form.Group>
                    <Form.Label>Invoice #</Form.Label>
                    <Form.Control type="text" value={invoiceId} onChange={e => setInvoiceId(e.target.value)}></Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <br />
        <Row>
            <Col md={4}>
                <Button disabled={isLoading} onClick={getInvoiceById}>
                    Load
                </Button>
            </Col>
        </Row>
        <br />
        {invoiceModal}
    </>
}