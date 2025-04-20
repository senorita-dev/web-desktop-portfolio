import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileDesktopIconProps } from 'src/components/DesktopIcon'
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
    createWindow: (
      state: WindowsState,
      action: PayloadAction<FileDesktopIconProps>,
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
        file: action.payload,
      }
      state.windows.push(newWindow)
      state.count += 1
    },
    deleteWindow: (
      state: WindowsState,
      action: PayloadAction<WindowProps['id']>,
    ) => {
      const windowId = action.payload
      const window = state.windows.find(({ id }) => id === windowId)
      if (window === undefined) {
        console.error('Window not found', windowId, state)
        return
      }
      state.windows = state.windows.filter(({ id }) => id !== windowId)
    },
    toggleMaximize: (
      state: WindowsState,
      action: PayloadAction<WindowProps['id']>,
    ) => {
      const windowId = action.payload
      const window = state.windows.find(({ id }) => id === windowId)
      if (window === undefined) {
        console.error('Window not found', windowId, state)
        return
      }
      const { x, y, width, height } = window
      const isMaximized = x === 0 && y === 0 && width === 100 && height === 100
      if (isMaximized) {
        window.x = 20
        window.y = 20
        window.width = 60
        window.height = 60
      } else {
        window.x = 0
        window.y = 0
        window.width = 100
        window.height = 100
      }
    },
  },
})

export const { createWindow, deleteWindow, toggleMaximize } =
  windowsSlice.actions
export default windowsSlice.reducer
