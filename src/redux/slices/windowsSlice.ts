import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileDesktopIconState } from 'src/redux/slices/desktopIconsSlice'
import { v4 as uuidv4 } from 'uuid'

export interface WindowState {
  id: string
  x: number
  y: number
  width: number
  height: number
  isMaximized: boolean
  file: FileDesktopIconState
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
      action: PayloadAction<FileDesktopIconState>,
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
        desktopIndex: state.windows.filter(
          ({ desktopIndex }) => desktopIndex >= 0,
        ).length,
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
      const { desktopIndex, taskbarIndex } = windowItem
      state.windows = state.windows
        .filter(({ id }) => id !== windowId)
        .map((windowItem) => {
          if (desktopIndex >= 0 && windowItem.desktopIndex > desktopIndex) {
            windowItem.desktopIndex--
          }
          if (desktopIndex < 0 && windowItem.desktopIndex < desktopIndex) {
            windowItem.desktopIndex++
          }
          if (taskbarIndex > windowItem.taskbarIndex) {
            windowItem.taskbarIndex--
          }
          return windowItem
        })
      const unMinimizedWindowCount = state.windows.filter(
        ({ desktopIndex }) => desktopIndex >= 0,
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
      const unMinimizedWindowCount = state.windows.filter(
        ({ desktopIndex }) => desktopIndex >= 0,
      ).length
      state.isWindowFocused = unMinimizedWindowCount > 0
    },
    focusWindow: (
      state: WindowsState,
      action: PayloadAction<WindowState['id']>,
    ) => {
      const windowId = action.payload
      const windowItem = state.windows.find(({ id }) => id === windowId)
      if (windowItem === undefined) {
        console.error('Window not found', windowId, state)
        return
      }
      state.isWindowFocused = true
      const unMinimizedWindowCount = state.windows.filter(
        ({ desktopIndex }) => desktopIndex >= 0,
      ).length
      const { desktopIndex } = windowItem
      state.windows.forEach((windowItem) => {
        if (desktopIndex < 0 && windowItem.desktopIndex < desktopIndex) {
          windowItem.desktopIndex++
        }
        if (desktopIndex >= 0 && windowItem.desktopIndex >= desktopIndex) {
          windowItem.desktopIndex--
        }
      })
      windowItem.desktopIndex = unMinimizedWindowCount
    },
    unFocusWindows: (state: WindowsState) => {
      state.isWindowFocused = false
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
  focusWindow,
  unFocusWindows,
  reorderTaskbarWindows,
} = windowsSlice.actions
export default windowsSlice.reducer
