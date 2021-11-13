import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    notification: {
        show: false,
        message: '',
        type: 'light',
        title: ''
    },
    isLoading: false,
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
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { sendNotification, closeNotitfication, setIsLoading } = appSlice.actions

export default appSlice.reducer