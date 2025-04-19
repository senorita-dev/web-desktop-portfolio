import { createSlice } from '@reduxjs/toolkit'
import { WindowProps } from 'src/components/Window'

interface WindowsState {
  value: WindowProps[]
}

const initialState: WindowsState = {
  value: [
    {
      title: 'notepad',
      width: 60,
      height: 60,
      x: 20,
      y: 20,
    },
  ],
}

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {},
})

export default windowsSlice.reducer
