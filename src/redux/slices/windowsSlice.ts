import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DesktopIconProps } from 'src/components/DesktopIcon'
import { WindowProps } from 'src/components/Window'
import { v4 as uuidv4 } from 'uuid'

interface WindowsState {
  windows: WindowProps[]
  count: number
}

const initialState: WindowsState = {
  windows: [],
  count: 0,
}

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    addWindow: (
      state: WindowsState,
      action: PayloadAction<DesktopIconProps>,
    ) => {
      const width = 60
      const height = 60
      const deltaX = state.count * 1
      const deltaY = state.count * 2
      const defaultX = 20
      const defaultY = 20
      const x = (defaultX + deltaX) % (100 - width)
      const y = (defaultY + deltaY) % (100 - height)
      const newWindow: WindowProps = {
        x,
        y,
        width,
        height,
        id: uuidv4(),
        title: action.payload.title,
      }
      state.windows.push(newWindow)
      state.count += 1
    },
  },
})

export const { addWindow } = windowsSlice.actions
export default windowsSlice.reducer
