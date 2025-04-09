import styles from './DesktopShell.module.css'
import Desktop from './Desktop'
import Taskbar from './Taskbar'

const DesktopShell = () => {
  return (
    <div className={styles.desktopShell}>
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default DesktopShell
