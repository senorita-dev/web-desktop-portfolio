import { createSlice } from '@reduxjs/toolkit'
import ComputerIconPath from 'src/assets/icons/computer_explorer.png'
import RecycleBinEmptyIconPath from 'src/assets/icons/recycle_bin_empty.png'
import InternetIconPath from 'src/assets/icons/internet_connection_wiz.png'
import NotepadIconPath from 'src/assets/icons/notepad.png'

interface BaseDesktopIconState {
  row: number
  col: number
  title: string
  icon: Icon
}
export interface ShortcutDesktopIconState extends BaseDesktopIconState {
  type: 'shortcut'
  url: string
  hideShortcutIcon?: boolean
}
type ApplicationType = 'Notepad'
export interface FileDesktopIconState extends BaseDesktopIconState {
  type: 'file'
  applicationType: ApplicationType
}
export interface CustomDesktopIconState extends BaseDesktopIconState {
  type: 'custom'
}
export type DesktopIconState =
  | ShortcutDesktopIconState
  | FileDesktopIconState
  | CustomDesktopIconState

interface DesktopIconsState {
  value: DesktopIconState[]
}

export interface Icon {
  path: string
  altText: string
}
const ComputerIcon: Icon = {
  path: ComputerIconPath,
  altText: 'Computer icon',
}
const RecycleBinEmptyIcon: Icon = {
  path: RecycleBinEmptyIconPath,
  altText: 'Empty Recycle Bin icon',
}
const InternetIcon: Icon = {
  path: InternetIconPath,
  altText: 'Web Browser icon',
}
const NotepadIcon: Icon = {
  path: NotepadIconPath,
  altText: 'Notepad icon',
}

const initialState: DesktopIconsState = {
  value: [
    {
      type: 'shortcut',
      row: 1,
      col: 1,
      title: 'Computer',
      icon: ComputerIcon,
      url: 'https://github.com/senorita-dev/web-desktop-portfolio',
      hideShortcutIcon: true,
    },
    {
      type: 'custom',
      row: 2,
      col: 1,
      title: 'Recycle Bin',
      icon: RecycleBinEmptyIcon,
    },
    {
      type: 'shortcut',
      row: 3,
      col: 1,
      title: 'GitHub',
      icon: InternetIcon,
      url: 'https://github.com/senorita-dev',
    },
    {
      type: 'shortcut',
      row: 4,
      col: 1,
      title: 'LinkedIn',
      icon: InternetIcon,
      url: 'https://www.linkedin.com/in/ren-saito/',
    },
    {
      type: 'file',
      row: 5,
      col: 1,
      title: 'About Me',
      icon: NotepadIcon,
      applicationType: 'Notepad',
    },
    {
      type: 'shortcut',
      row: 1,
      col: 2,
      title: '2048',
      icon: InternetIcon,
      url: 'https://2048-kohl-chi.vercel.app/',
    },
  ],
}

const desktopIconsSlice = createSlice({
  name: 'desktopIcons',
  initialState,
  reducers: {},
})

export default desktopIconsSlice.reducer
