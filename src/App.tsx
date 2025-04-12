import DesktopShell from 'src/components/DesktopShell'
import { DesktopItemProps } from 'src/components/DesktopItem'
import ComputerIcon from 'src/assets/icons/computer_explorer.png'

function App() {
  const desktopItems: DesktopItemProps[] = [
    { row: 1, col: 1, title: 'Computer', icon: ComputerIcon },
  ]
  return <DesktopShell items={desktopItems} />
}

export default App
