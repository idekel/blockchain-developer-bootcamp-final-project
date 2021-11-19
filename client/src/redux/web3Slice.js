import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import Web3 from 'web3'
import { POS_ABI, POS_ADDR } from '../constants/POS'

const initialState = {
    connected: false,
    loadingInvoice: false,
}

let web3 = null


export const connectToMetaMask = createAsyncThunk('web3/connectToMetaMask',
    async (_, thunkAPI) => {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        web3 = new Web3(window.ethereum);
        thunkAPI.dispatch(setConnected(true))
    })

export const listenForNewInvoices = createAsyncThunk('web3/listenForNewInvoices',
    async () => {
        const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
        pos.events.newInvoice({}, (error, event) => {
            console.log(error)
        }).on('connected', (subscriptionId) => {
            console.log(subscriptionId)
        }).on('data', (event) => {
            console.log(event)
        })
    })

export const createInvoice = createAsyncThunk(
    'web3/createInvoice',
    async ({ discounts, client, products }) => {
        const beneficiary = window.ethereum.selectedAddress
        //     imageUrl: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
        try {
            const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
            const ret = await pos.methods.createInvoice(products, discounts, client, beneficiary)
                .send({ from: beneficiary })
            console.log(ret)
        } catch (e) {
            return e
        }
        return true
    },
)

export const loadInvoice = createAsyncThunk('web3/loadInvoice', async (id) => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    const invoice = await pos.methods.getInvoiceById(id).call()
    return invoice
})

export const getInvoices = createAsyncThunk('web3/getInvoices', async () => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    const invoices = await pos.methods.getInvoicesFor(window.ethereum.selectedAddress).call()
    return invoices
})

export const getBalance = createAsyncThunk('web3/getBalance', async () => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    const balance = await pos.methods.getBalanceOf(window.ethereum.selectedAddress).call()
    return balance
})

export const getContractFee = createAsyncThunk('web3/getContractFee', async () => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    const method = pos.methods.feeInBasisPoints()
    const fee = await method.call()
    return fee
})

export const setContractFee = createAsyncThunk('web3/setContractFee', async (newFee) => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    try {
        const ret = await pos.methods.setContractFee(newFee)
            .send({ from: window.ethereum.selectedAddress})
    } catch (e) {
        return false
    }
    return true
})

export const getInvoiceProducts = createAsyncThunk('web3/getInvoiceProducts', (id) => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    return pos.methods.getInvoiceProducts(id).call()
})


export const payInvoice = createAsyncThunk('web3/payInvoice', async (id, thunkAPI) => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    try {
        const { payload } = await thunkAPI.dispatch(loadInvoice(id))
        const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
        const ret = await pos.methods.payInvoice(id)
            .send({ from: window.ethereum.selectedAddress, value: payload.total })
        console.log(ret)
    } catch (e) {
        console.log(e)
        return false
    }
    return true
})

export const sendWithdraw = createAsyncThunk('web3/withdraw', async (id, thunkAPI) => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    try {
        const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
        const ret = await pos.methods.withdraw()
            .send({ from: window.ethereum.selectedAddress})
        console.log(ret)
    } catch (e) {
        console.log(e)
        return false
    }
    return true
})

export const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setConnected: (state, action) => {
            state.connected = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createInvoice.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(loadInvoice.pending, (state, action) => {
            debugger
            state.loadingInvoice = true;
        })
        builder.addCase(loadInvoice.fulfilled, (state, action) => {
            debugger
            state.loadingInvoice = false;
        })
    },
})

export const { setConnected } = web3Slice.actions

export default web3Slice.reducer
