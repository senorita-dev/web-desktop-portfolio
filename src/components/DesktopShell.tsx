import styles from 'src/components/DesktopShell.module.css'
import Desktop from 'src/components/Desktop'
import Taskbar from 'src/components/Taskbar'

const DesktopShell = () => {
  return (
    <div className={styles.desktopShell}>
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default DesktopShell
