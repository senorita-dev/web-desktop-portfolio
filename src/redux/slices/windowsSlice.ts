import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DesktopIconProps } from 'src/components/DesktopIcon'
import { WindowProps } from 'src/components/Window'

interface WindowsState {
  value: WindowProps[]
}

const initialState: WindowsState = {
  value: [],
}

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    addWindow: (
      state: WindowsState,
      action: PayloadAction<DesktopIconProps>,
    ) => {
      const newWindow: WindowProps = {
        title: action.payload.title,
        height: 60,
        width: 60,
        x: 20,
        y: 20,
      }
      state.value.push(newWindow)
    },
  },
})

export const { addWindow } = windowsSlice.actions
export default windowsSlice.reducer
