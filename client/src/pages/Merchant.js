import { InvoiceForm } from '../components/InvoiceForm'
import { getBalance } from '../redux/web3Slice'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Web3 from 'web3'
import { InvoiceList } from '../components/InvoiceList'


export const MerchantHome = () => {
    const [balance, setBalance] = useState(null)
    const dispatch = useDispatch()
    useEffect(async () => {
        const ret = await dispatch(getBalance())
        setBalance(Web3.utils.fromWei(ret.payload))
    })
    let balanceSection = null
    if (balance !== null) {
        balanceSection = <Row>
            <Col>
                <h1>Current balance: {balance}</h1>
            </Col>
        </Row>
    }
    return <Tabs defaultActiveKey="invoices">
        <Tab eventKey="invoices" title="My Invoices">
            {balanceSection}
            <h1>List</h1>
            <InvoiceList />
        </Tab>
        <Tab eventKey="invoice-form" title="Create new invoice">
            <InvoiceForm></InvoiceForm>
        </Tab>
    </Tabs>
}