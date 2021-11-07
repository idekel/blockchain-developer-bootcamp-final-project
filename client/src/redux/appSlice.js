import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    notification: {
        show: false,
        message: '',
        type: 'light',
        title: ''
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        sendNotification: (state, action) => {
            state.notification = {
                show: true,
                message: action.payload.message,
                type: action.payload.type || 'success',
                title: action.payload.title || 'Success',
            }
        },
        closeNotitfication: (state) => {
            state.notification = { show: false, message: '', type: 'light', title: '', }
        },
    }
})

export const { sendNotification, closeNotitfication } = appSlice.actions

export default appSlice.reducer