import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileDesktopIconProps } from 'src/components/DesktopIcon'
import { v4 as uuidv4 } from 'uuid'

export interface WindowState {
  id: string
  x: number
  y: number
  width: number
  height: number
  isMaximized: boolean
  file: FileDesktopIconProps
  desktopIndex: number
  taskbarIndex: number
}

interface WindowsState {
  windows: WindowState[]
  isWindowFocused: boolean
}

const initialState: WindowsState = {
  windows: [],
  isWindowFocused: false,
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
        isMaximized: false,
        file: action.payload,
        desktopIndex: count,
        taskbarIndex: count,
      }
      state.windows.push(windowItem)
      state.isWindowFocused = true
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
          const { desktopIndex, taskbarIndex } = windowItem
          if (desktopIndex > windowItem.desktopIndex) {
            windowItem.desktopIndex--
          }
          if (taskbarIndex > windowItem.taskbarIndex) {
            windowItem.taskbarIndex--
          }
          return windowItem
        })
      const unMinimizedWindowCount = state.windows.filter(
        ({ taskbarIndex }) => taskbarIndex >= 0,
      ).length
      state.isWindowFocused = unMinimizedWindowCount > 0
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
      windowItem.isMaximized = !windowItem.isMaximized
      state.isWindowFocused = true
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
      helperMinimizeWindow(state, windowItem)
      const unMinimizedWindowCount = state.windows.filter(
        ({ taskbarIndex }) => taskbarIndex >= 0,
      ).length
      state.isWindowFocused = unMinimizedWindowCount > 0
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
      const unMinimizedWindowCount = state.windows.filter(
        ({ taskbarIndex }) => taskbarIndex >= 0,
      ).length
      const isMinimized = windowItem.desktopIndex < 0
      if (!isMinimized) {
        helperMinimizeWindow(state, windowItem)
        state.isWindowFocused = unMinimizedWindowCount - 1 > 0
      } else {
        windowItem.desktopIndex = unMinimizedWindowCount - 1
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

function helperMinimizeWindow(state: WindowsState, windowItem: WindowState) {
  const { desktopIndex } = windowItem
  let minimizedWindowCount = 0
  state.windows.forEach((windowItem) => {
    if (windowItem.desktopIndex < 0) {
      minimizedWindowCount++
    }
    if (windowItem.desktopIndex > desktopIndex) {
      windowItem.desktopIndex--
    }
  })
  windowItem.desktopIndex = -minimizedWindowCount - 1
}

export const {
  createWindow,
  deleteWindow,
  toggleMaximize,
  minimizeWindow,
  toggleMinimize,
  reorderTaskbarWindows,
} = windowsSlice.actions
export default windowsSlice.reducer
