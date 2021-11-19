import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Web3 from 'web3'
import { payInvoice, getInvoiceProducts } from '../redux/web3Slice'
import { Row, Col, Button, Modal, Table } from 'react-bootstrap'
import { setIsLoading } from '../redux/appSlice'


export const InvoiceDetail = (props) => {

    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.app.isLoading)

    const loadProducts = async () => {
        dispatch(setIsLoading(true))
        const ret = await dispatch(getInvoiceProducts(props.invoice.id))
        setProducts(ret.payload ?? [])
        dispatch(setIsLoading(false))
    }

    const onPayInvoice = async () => {
        dispatch(setIsLoading(true))
        const ret = await dispatch(payInvoice(props.invoice.id))
        dispatch(setIsLoading(false))
        props.onHide(ret.payload)
    }

    let child = <Button disabled={isLoading} onClick={products.length == 0 ? loadProducts : () => setProducts([])}>{products.length == 0 ? 'Load products' : 'Hide products'}</Button>
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

    const showPayButton = props.showPayButton !== undefined ? props.showPayButton : true

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
                        {showPayButton && <Button disabled={isLoading} onClick={onPayInvoice}>Pay invoice</Button>}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </>
}