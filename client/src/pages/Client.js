import { useState } from "react"
import { Row, Col, Form, Button, Modal, Table } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import Web3 from "web3"
import { loadInvoice, getInvoiceProducts, payInvoice } from "../redux/web3Slice"


const InvoiceDetail = (props) => {

    const [products, setProducts] = useState([])
    const dispatch = useDispatch()

    const loadProducts = async () => {
        const ret = await dispatch(getInvoiceProducts(props.invoice.id))
        console.log(ret)
        setProducts(ret.payload ?? [])
    }

    let child = <Button onClick={products.length == 0 ? loadProducts : () => setProducts([]) }>{products.length == 0 ? 'Load products' : 'Hide products'}</Button>
    let productsTable = null

    if (products.length > 0) {
        productsTable = <Table>
            <thead>
                <tr>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => <tr>
                    <td>{product.imageUrl}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                </tr>)}
            </tbody>
        </Table>
    }

    return <>
        <Modal
            onHide={props.onHide}
            size="lg"
            centered
            show={true}
        >
            <Modal.Body>
                <Row>
                    <Col>
                        <div><span>Number #: {props.invoice.id}</span></div>
                        <div><span>Creator: {props.invoice.owner}</span></div>
                        <div><span>Merchant: {props.invoice.beneficiary}</span></div>
                        <div><span>Custumer: {props.invoice.buyer}</span></div>
                        <div><span>Subtotal: {Web3.utils.fromWei(props.invoice.subtotal)} Eth</span></div>
                        <div><span>Discounts: {Web3.utils.fromWei(props.invoice.discounts)} Eth</span></div>
                        <div><span>Total: {Web3.utils.fromWei(props.invoice.total)} Eth</span></div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        {productsTable}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {child}
                    </Col>
                    <Col>
                        <Button onClick={() => dispatch(payInvoice(props.invoice.id))}>Pay invoice</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </>
}

export const ClientHome = () => {
    const dispatch = useDispatch()
    const [invoiceId, setInvoiceId] = useState(0)
    const [invoice, setInvoice] = useState(null)

    const getInvoiceById = async () => {
        const ret = await dispatch(loadInvoice(invoiceId))
        console.log(ret.payload)
        setInvoice(ret.payload)
    }

    let invoiceModal = null
    if (invoice != null) {
        const args = { invoice, onHide: () => setInvoice(null) }
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
                <Button onClick={getInvoiceById}>
                    Load
                </Button>
            </Col>
        </Row>
        {invoiceModal}
    </>
}