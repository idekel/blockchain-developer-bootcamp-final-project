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

export const createInvoice = createAsyncThunk(
    'web3/createInvoice',
    async ({ discounts, client, products }) => {
        const beneficiary = window.ethereum.selectedAddress
        // const validProduct = {
        //     name: 'Some product',
        //     kind: '0',
        //     price: 1,
        //     quantity: 1,
        //     usdPrice: 100,
        //     upc: '12093',
        //     imageUrl: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
        // };
        try {
            const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
            const ret = await pos.methods.createInvoice(products, discounts, client, beneficiary)
                .send({ from: beneficiary })
            console.log(ret)
        } catch (e) {
            console.log(e)
        }

    },
)

export const loadInvoice = createAsyncThunk('web3/loadInvoice', async (id) => {
    const pos = new web3.eth.Contract(POS_ABI, POS_ADDR)
    const invoice = await pos.methods.getInvoiceById(id).call()
    return invoice
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
    }
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
            state.loadingInvoice = true;
        })
        builder.addCase(loadInvoice.fulfilled, (state, action) => {
            state.loadingInvoice = false;
        })
    },
})

export const { setConnected } = web3Slice.actions

export default web3Slice.reducer
