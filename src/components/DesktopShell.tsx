import styles from './DesktopShell.module.css'

const DesktopShell = () => {
  return (
    <div className={styles.desktopShell}>
      <Desktop />
      <Taskbar />
    </div>
  )
}

const Desktop = () => {
  return (
    <div className={styles.desktop}>
      <p>Desktop</p>
    </div>
  )
}

const Taskbar = () => {
  return (
    <div className={styles.taskbar}>
      <p>Taskbar</p>
    </div>
  )
}

export default DesktopShell
