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
      shortcut: true,
    },
  ]
  return <DesktopShell items={desktopItems} />
}

export default App
