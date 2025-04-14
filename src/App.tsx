import DesktopShell from 'src/components/DesktopShell'
import { DesktopItemProps } from 'src/components/DesktopItem'
import ComputerIcon from 'src/assets/icons/computer_explorer.png'
import InternetIcon from 'src/assets/icons/internet_connection_wiz.png'

function App() {
  const desktopItems: DesktopItemProps[] = [
    { row: 1, col: 1, title: 'Computer', icon: ComputerIcon },
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
  ]
  return <DesktopShell items={desktopItems} />
}

export default App
