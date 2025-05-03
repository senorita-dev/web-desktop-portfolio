import { createSlice } from '@reduxjs/toolkit'
import ComputerIcon from 'src/assets/icons/computer_explorer.png'
import RecycleBinEmptyIcon from 'src/assets/icons/recycle_bin_empty.png'
import InternetIcon from 'src/assets/icons/internet_connection_wiz.png'
import NotepadIcon from 'src/assets/icons/notepad.png'
import { DesktopIconProps } from 'src/components/DesktopIcon'

interface DesktopIconsState {
  value: DesktopIconProps[]
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
