import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileDesktopIconProps } from 'src/components/DesktopIcon'
import { v4 as uuidv4 } from 'uuid'

export interface DesktopWindowState {
  id: string
  x: number
  y: number
  width: number
  height: number
  file: FileDesktopIconProps
  isMinimized: boolean
}

export interface TaskbarWindowState {
  id: string
  file: FileDesktopIconProps
}

interface WindowsState {
  desktopWindows: DesktopWindowState[]
  taskbarWindows: TaskbarWindowState[]
  count: number
}

const initialState: WindowsState = {
  desktopWindows: [],
  taskbarWindows: [],
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
      const file = action.payload
      const newWindow: DesktopWindowState = {
        x,
        y,
        width,
        height,
        id: uuidv4(),
        file: action.payload,
        isMinimized: false,
      }
      state.desktopWindows.push(newWindow)
      state.taskbarWindows.push({ id: newWindow.id, file })
      state.count += 1
    },
    deleteWindow: (
      state: WindowsState,
      action: PayloadAction<DesktopWindowState['id']>,
    ) => {
      const windowId = action.payload
      const desktopWindow = state.desktopWindows.find(
        ({ id }) => id === windowId,
      )
      if (desktopWindow === undefined) {
        console.error('Window not found', windowId, state)
        return
      }
      state.desktopWindows = state.desktopWindows.filter(
        ({ id }) => id !== windowId,
      )
      state.taskbarWindows = state.taskbarWindows.filter(
        ({ id }) => id !== windowId,
      )
      state.count -= 1
    },
    toggleMaximize: (
      state: WindowsState,
      action: PayloadAction<DesktopWindowState['id']>,
    ) => {
      const windowId = action.payload
      const desktopWindow = state.desktopWindows.find(
        ({ id }) => id === windowId,
      )
      if (desktopWindow === undefined) {
        console.error('DesktopWindow not found', windowId, state)
        return
      }
      const { x, y, width, height } = desktopWindow
      const isMaximized = x === 0 && y === 0 && width === 100 && height === 100
      if (isMaximized) {
        desktopWindow.x = 20
        desktopWindow.y = 20
        desktopWindow.width = 60
        desktopWindow.height = 60
      } else {
        desktopWindow.x = 0
        desktopWindow.y = 0
        desktopWindow.width = 100
        desktopWindow.height = 100
      }
    },
    minimizeWindow: (
      state: WindowsState,
      action: PayloadAction<DesktopWindowState['id']>,
    ) => {
      const windowId = action.payload
      const desktopWindow = state.desktopWindows.find(
        ({ id }) => id === windowId,
      )
      if (desktopWindow === undefined) {
        console.error('DesktopWindow not found', windowId, state)
        return
      }
      if (desktopWindow.isMinimized) {
        console.error('DesktopWindow already minimized', windowId, state)
        return
      }
      desktopWindow.isMinimized = true
    },
    toggleMinimize: (
      state: WindowsState,
      action: PayloadAction<DesktopWindowState['id']>,
    ) => {
      const windowId = action.payload
      const desktopWindow = state.desktopWindows.find(
        ({ id }) => id === windowId,
      )
      if (desktopWindow === undefined) {
        console.error('DesktopWindow not found', windowId, state)
        return
      }
      desktopWindow.isMinimized = !desktopWindow.isMinimized
      if (!desktopWindow.isMinimized) {
        state.desktopWindows = [
          ...state.desktopWindows.filter(({ id }) => id !== desktopWindow.id),
          desktopWindow,
        ]
      }
    },
  },
})

export const {
  createWindow,
  deleteWindow,
  toggleMaximize,
  minimizeWindow,
  toggleMinimize,
} = windowsSlice.actions
export default windowsSlice.reducer
