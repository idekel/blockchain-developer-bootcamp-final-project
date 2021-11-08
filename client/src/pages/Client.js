import { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Modal, Table, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loadInvoice, listenForNewInvoices } from '../redux/web3Slice'
import { InvoiceDetail } from '../components/InvoiceDetail'


export const ClientHome = () => {
    const dispatch = useDispatch()
    const [invoiceId, setInvoiceId] = useState(0)
    const [invoice, setInvoice] = useState(null)
    const [showInvoicePaySuccess, setShowInvoicePaySuccess] = useState(false)
    const [showInvoicePayFail, setShowInvoicePayFail] = useState(false)

    useEffect(() => {
        dispatch(listenForNewInvoices())
    }, [])

    const getInvoiceById = async () => {
        const ret = await dispatch(loadInvoice(invoiceId))
        console.log(ret.payload)
        setInvoice(ret.payload)
    }

    let invoiceModal = null
    if (invoice != null) {
        const onHide = (ret) => {
            setInvoice(null)
            if (ret){
                setShowInvoicePaySuccess(true)
            } else if (ret === false){
                setShowInvoicePayFail(true)
            }
            setTimeout(() => {
                setShowInvoicePaySuccess(false)
                setShowInvoicePayFail(false)
            }, 5000)
        }
        const args = { invoice, onHide }
        invoiceModal = <InvoiceDetail {...args} />
    }

    let payInvoiceAlert = null
    if (showInvoicePaySuccess){
        payInvoiceAlert = <Alert variant="success">
        Invoice paid successfuly
      </Alert>
    }
    else if (showInvoicePayFail){
        payInvoiceAlert = <Alert variant="danger">
        Failed to pay Invoice
      </Alert>
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
                <Button onClick={getInvoiceById}>
                    Load
                </Button>
            </Col>
        </Row>
        <br />
        <Row>
            <Col md={4}>
                {payInvoiceAlert}
            </Col>
        </Row>
        {invoiceModal}
    </>
}