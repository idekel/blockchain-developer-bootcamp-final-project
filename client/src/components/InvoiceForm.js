import { useState } from 'react';
import { Row, Col, Form, Button, Modal, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createInvoice } from '../redux/web3Slice'
import { sendNotification, setIsLoading } from '../redux/appSlice'
import Web3 from 'web3'


const ProductForm = (props) => {
    const [name, setName] = useState('')
    const [kind, setKind] = useState('0')
    const [price, setPrice] = useState(0)
    const [usdPrice, setUSDPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [upc, setUPC] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    return <>
        <Modal
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
        >
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Kind</Form.Label>
                    <Form.Select value={name} onChange={e => { setKind(e.target.value) }}>
                        <option value="0">Good</option>
                        <option value="1">Service</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>USD Price</Form.Label>
                    <Form.Control type="number" value={usdPrice} onChange={e => setUSDPrice(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>UPC</Form.Label>
                    <Form.Control type="text" value={upc} onChange={e => setUPC(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <br />
            <Button onClick={() => props.onProductCreated({ kind, name, imageUrl, upc, price: Web3.utils.toWei(price), usdPrice, quantity })}>Add</Button>
        </Modal>
    </>
}

export const InvoiceForm = () => {

    const dispatch = useDispatch()
    const [client, setClient] = useState('')
    const [discounts, setDiscount] = useState('0')
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [products, setProducts] = useState([])
    const isLoading = useSelector(state => state.app.isLoading)

    const submitInvoice = async () => {
        dispatch(setIsLoading(true))
        const { payload } = await dispatch(createInvoice({ discounts: Web3.utils.toWei(discounts), client, products }))
        if (payload === true) {
            dispatch(sendNotification({ message: 'Transaction completed successfuly.', title: 'Success' }))
            setClient('')
            setDiscount('0')
            setProducts([])
        } else {
            dispatch(sendNotification({ message: `Trasanction failed. Error: ${payload.message}`, title: 'Error', type: 'danger' }))
        }
        dispatch(setIsLoading(false))
    }

    const onHideProductForm = () => setShowAddProduct(false)

    const onProductCreated = (product) => {
        setProducts([...products, product])
        onHideProductForm()
    }

    const onDeleteProduct = (i) => {
        products.splice(i, 1)
        setProducts([...products])
    }

    let productForm = null
    if (showAddProduct) {
        productForm = <ProductForm onHide={onHideProductForm} onProductCreated={onProductCreated} />
    }

    let tbody = null
    if (products.length > 0) {
        const trs = []
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            const tr = <tr>
                <td>{i + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.usdPrice}</td>
                <td>{product.kind == 0 ? 'Good' : 'Service'}</td>
                <td className="deleteProduct" onClick={() => onDeleteProduct(i)}>x</td>
            </tr>

            trs.push(tr)
        }
        tbody = <tbody>{trs}</tbody>
    }

    return <>
        <Row>
            <Col md={6}>
                <Form.Group>
                    <Form.Label>Client address</Form.Label>
                    <Form.Control value={client} type="text" placeholder="Entenr your client wallet address" onChange={e => setClient(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Discounts</Form.Label>
                    <Form.Control value={discounts} type="number" placeholder="Entenr any discounts or 0" onChange={e => setDiscount(e.target.value)}></Form.Control>
                </Form.Group>
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price ether</th>
                            <th>Quantity</th>
                            <th>Price USD</th>
                            <th>Kind</th>
                            <th onClick={() => setShowAddProduct(true)}>+</th>
                        </tr>
                    </thead>
                    {tbody}
                </Table>
                {productForm}
                <br />
                <Button disabled={isLoading} onClick={submitInvoice}>Enviar</Button>
            </Col>
        </Row>
    </>
};