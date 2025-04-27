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
  taskbarIndex: number
}

interface WindowsState {
  desktopWindows: DesktopWindowState[]
}

const initialState: WindowsState = {
  desktopWindows: [],
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
      const count = state.desktopWindows.length
      const deltaX = count * 1
      const deltaY = count * 2
      const defaultX = 20
      const defaultY = 20
      const x = (defaultX + deltaX) % (100 - width)
      const y = (defaultY + deltaY) % (100 - height)
      const desktopWindow: DesktopWindowState = {
        id,
        x,
        y,
        width,
        height,
        file: action.payload,
        isMinimized: false,
        taskbarIndex: count,
      }
      state.desktopWindows.push(desktopWindow)
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
      state.desktopWindows = state.desktopWindows
        .filter(({ id }) => id !== windowId)
        .map((desktopWindow) => {
          const { taskbarIndex } = desktopWindow
          if (taskbarIndex < desktopWindow.taskbarIndex) {
            return desktopWindow
          }
          desktopWindow.taskbarIndex -= 1
          return desktopWindow
        })
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
    reorderTaskbarWindows: (
      state: WindowsState,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) => {
      const { oldIndex, newIndex } = action.payload
      if (oldIndex < 0 || oldIndex >= state.desktopWindows.length) {
        console.error('oldIndex is out of index')
        return
      }
      if (newIndex < 0 || newIndex >= state.desktopWindows.length) {
        console.error('newIndex is out of index')
        return
      }
      state.desktopWindows.map((desktopWindow) => {
        const { taskbarIndex } = desktopWindow
        if (taskbarIndex === oldIndex) {
          desktopWindow.taskbarIndex = newIndex
        } else if (
          oldIndex < newIndex &&
          oldIndex <= taskbarIndex &&
          taskbarIndex <= newIndex
        ) {
          desktopWindow.taskbarIndex--
        } else if (
          oldIndex > newIndex &&
          newIndex <= taskbarIndex &&
          taskbarIndex <= oldIndex
        ) {
          desktopWindow.taskbarIndex++
        }
        return desktopWindow
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
