import { useEffect, useState } from 'react'
import { Table, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Web3 from 'web3'
import { getInvoices } from '../redux/web3Slice'
import { InvoiceDetail } from './InvoiceDetail'
import './scss/InvoiceList.scss'

export const InvoiceList = () => {
    const dispatch = useDispatch()
    const [invoices, setInvoices] = useState([])
    const [invoice, setInvoice] = useState(null)

    useEffect(async () => {
        try {
            const ret = await dispatch(getInvoices())
            if (ret.payload)
                setInvoices(ret.payload)
        } catch (e) {
            console.log(e)
        }
    })

    let invoiceDetail = null
    if (invoice != null) {
        const onHide = () => setInvoice(null)
        invoiceDetail = <InvoiceDetail onHide={onHide} invoice={invoice} showPayButton={false} />
    }

    let child = <Alert variant="warning">
        <h3>You don't have invoices yet</h3>
    </Alert> 

    if (invoices.length > 0) {
        child = <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID#</th>
                    <th>Beneficiary</th>
                    <th>Client</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {invoices.map(invoice => <tr>
                    <td>{invoice.id}</td>
                    <td>{invoice.beneficiary}</td>
                    <td>{invoice.buyer}</td>
                    <td>{Web3.utils.fromWei(invoice.total)}</td>
                    <td>{invoice.status == 1 ? 'Paid' : 'Pending'}</td>
                    <td><a onClick={() => setInvoice(invoice)}>Ver</a></td>
                </tr>)}
            </tbody>
        </Table>
    }

    return <div className="InvoiceList">
        {child}
        {invoiceDetail}
    </div>
}