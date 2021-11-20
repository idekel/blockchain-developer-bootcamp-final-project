import { InvoiceForm } from '../components/InvoiceForm'
import { getBalance, sendWithdraw } from '../redux/web3Slice'
import { sendNotification, setIsLoading } from '../redux/appSlice'
import { Row, Col, Tabs, Tab, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Web3 from 'web3'
import { InvoiceList } from '../components/InvoiceList'


export const MerchantHome = () => {
    const [balance, setBalance] = useState(null)
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.app.isLoading)


    const onGetBalance = async () => {
        const ret = await dispatch(getBalance())
        setBalance(Web3.utils.fromWei(ret.payload || '0'))
    }

    useEffect(() => {
        onGetBalance()
    })
    let balanceSection = null
    if (balance !== null) {
        const onWithdraw = async () => {
            dispatch(setIsLoading(true))
            const ret = await dispatch(sendWithdraw())
            if (ret.payload) {
                dispatch(sendNotification({ message: `Trasanction successful.`, title: 'Success' }))
            } else {
                dispatch(sendNotification({ message: `Trasanction failed.`, title: 'Error', type: 'danger' }))
            }
            dispatch(setIsLoading(false))
        }
        const withdraw =
            <Button disabled={isLoading} onClick={onWithdraw}>Withdraw</Button>
        balanceSection = <Row>
            <Col>
                <h1>Current balance: {balance} {balance > 0 && withdraw} </h1>
            </Col>
        </Row>
    }
    return <Tabs defaultActiveKey="invoices">
        <Tab eventKey="invoices" title="My Invoices">
            {balanceSection}
            <h1>List of invoices</h1>
            <hr />
            <InvoiceList />
        </Tab>
        <Tab eventKey="invoice-form" title="Create new invoice">
            <InvoiceForm></InvoiceForm>
        </Tab>
    </Tabs>
}