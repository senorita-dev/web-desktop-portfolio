import DesktopShell from 'src/components/DesktopShell'
import { DesktopItemProps } from 'src/components/DesktopItem'

function App() {
  const desktopItems: DesktopItemProps[] = [
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ]
  return <DesktopShell items={desktopItems} />
}

export default App
