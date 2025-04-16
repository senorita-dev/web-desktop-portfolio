import { createContext } from 'react'
import ComputerIcon from 'src/assets/icons/computer_explorer.png'
import InternetIcon from 'src/assets/icons/internet_connection_wiz.png'
import NotepadIcon from 'src/assets/icons/notepad.png'
import { DesktopItemProps } from 'src/components/DesktopItem'

const desktopItems: DesktopItemProps[] = [
  {
    row: 1,
    col: 1,
    title: 'Computer',
    icon: ComputerIcon,
  },
  {
    row: 2,
    col: 1,
    title: 'Source Code',
    icon: InternetIcon,
    onOpen: () => {
      window.open(
        'https://github.com/senorita-dev/web-desktop-portfolio',
        '_blank',
        'noopener,noreferrer',
      )
    },
    shortcut: true,
  },
  {
    row: 3,
    col: 1,
    title: 'GitHub',
    icon: InternetIcon,
    onOpen: () => {
      window.open(
        'https://github.com/senorita-dev',
        '_blank',
        'noopener,noreferrer',
      )
    },
    shortcut: true,
  },
  {
    row: 4,
    col: 1,
    title: 'LinkedIn',
    icon: InternetIcon,
    onOpen: () => {
      window.open(
        'https://www.linkedin.com/in/ren-saito/',
        '_blank',
        'noopener,noreferrer',
      )
    },
    shortcut: true,
  },
  {
    row: 5,
    col: 1,
    title: 'weaknesses',
    icon: NotepadIcon,
  },
]

interface AppContextType {
  desktopItems: DesktopItemProps[]
}

export const appContext: AppContextType = { desktopItems }

const AppContext = createContext<AppContextType>(appContext)

export default AppContext
