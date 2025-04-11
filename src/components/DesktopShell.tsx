import styles from 'src/components/DesktopShell.module.css'
import Desktop from 'src/components/Desktop'
import Taskbar from 'src/components/Taskbar'
import { DesktopItemProps } from 'src/components/DesktopItem'

interface DesktopShellProps {
  items: DesktopItemProps[]
}
const DesktopShell = (props: DesktopShellProps) => {
  const { items } = props
  return (
    <div className={styles.desktopShell}>
      <Desktop items={items} />
      <Taskbar />
    </div>
  )
}

export default DesktopShell
