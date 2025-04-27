import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileDesktopIconProps } from 'src/components/DesktopIcon'
import { v4 as uuidv4 } from 'uuid'

export interface WindowState {
  id: string
  x: number
  y: number
  width: number
  height: number
  file: FileDesktopIconProps
  isMinimized: boolean
  taskbarIndex: number
}

interface WindowsState {
  windows: WindowState[]
}

const initialState: WindowsState = {
  windows: [],
}

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    createWindow: (
      state: WindowsState,
      action: PayloadAction<FileDesktopIconProps>,
    ) => {
      const id = uuidv4()
      const width = 60
      const height = 60
      const count = state.windows.length
      const deltaX = count * 1
      const deltaY = count * 2
      const defaultX = 20
      const defaultY = 20
      const x = (defaultX + deltaX) % (100 - width)
      const y = (defaultY + deltaY) % (100 - height)
      const windowItem: WindowState = {
        id,
        x,
        y,
        width,
        height,
        file: action.payload,
        isMinimized: false,
        taskbarIndex: count,
      }
      state.windows.push(windowItem)
    },
    deleteWindow: (
      state: WindowsState,
      action: PayloadAction<WindowState['id']>,
    ) => {
      const windowId = action.payload
      const windowItem = state.windows.find(({ id }) => id === windowId)
      if (windowItem === undefined) {
        console.error('Window not found', windowId, state)
        return
      }
      state.windows = state.windows
        .filter(({ id }) => id !== windowId)
        .map((windowItem) => {
          const { taskbarIndex } = windowItem
          if (taskbarIndex < windowItem.taskbarIndex) {
            return windowItem
          }
          windowItem.taskbarIndex -= 1
          return windowItem
        })
    },
    toggleMaximize: (
      state: WindowsState,
      action: PayloadAction<WindowState['id']>,
    ) => {
      const windowId = action.payload
      const windowItem = state.windows.find(({ id }) => id === windowId)
      if (windowItem === undefined) {
        console.error('Window not found', windowId, state)
        return
      }
      const { x, y, width, height } = windowItem
      const isMaximized = x === 0 && y === 0 && width === 100 && height === 100
      if (isMaximized) {
        windowItem.x = 20
        windowItem.y = 20
        windowItem.width = 60
        windowItem.height = 60
      } else {
        windowItem.x = 0
        windowItem.y = 0
        windowItem.width = 100
        windowItem.height = 100
      }
    },
    minimizeWindow: (
      state: WindowsState,
      action: PayloadAction<WindowState['id']>,
    ) => {
      const windowId = action.payload
      const windowItem = state.windows.find(({ id }) => id === windowId)
      if (windowItem === undefined) {
        console.error('Window not found', windowId, state)
        return
      }
      if (windowItem.isMinimized) {
        console.error('Window already minimized', windowId, state)
        return
      }
      windowItem.isMinimized = true
    },
    toggleMinimize: (
      state: WindowsState,
      action: PayloadAction<WindowState['id']>,
    ) => {
      const windowId = action.payload
      const windowItem = state.windows.find(({ id }) => id === windowId)
      if (windowItem === undefined) {
        console.error('Window not found', windowId, state)
        return
      }
      windowItem.isMinimized = !windowItem.isMinimized
      if (!windowItem.isMinimized) {
        state.windows = [
          ...state.windows.filter(({ id }) => id !== windowItem.id),
          windowItem,
        ]
      }
    },
    reorderTaskbarWindows: (
      state: WindowsState,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) => {
      const { oldIndex, newIndex } = action.payload
      if (oldIndex < 0 || oldIndex >= state.windows.length) {
        console.error('oldIndex is out of index', oldIndex)
        return
      }
      if (newIndex < 0 || newIndex >= state.windows.length) {
        console.error('newIndex is out of index', newIndex)
        return
      }
      state.windows.map((windowItem) => {
        const { taskbarIndex } = windowItem
        if (taskbarIndex === oldIndex) {
          windowItem.taskbarIndex = newIndex
        } else if (
          oldIndex < newIndex &&
          oldIndex <= taskbarIndex &&
          taskbarIndex <= newIndex
        ) {
          windowItem.taskbarIndex--
        } else if (
          oldIndex > newIndex &&
          newIndex <= taskbarIndex &&
          taskbarIndex <= oldIndex
        ) {
          windowItem.taskbarIndex++
        }
        return windowItem
      })
    },
  },
})

export const {
  createWindow,
  deleteWindow,
  toggleMaximize,
  minimizeWindow,
  toggleMinimize,
  reorderTaskbarWindows,
} = windowsSlice.actions
export default windowsSlice.reducer
