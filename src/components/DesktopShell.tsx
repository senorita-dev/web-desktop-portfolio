import styles from './DesktopShell.module.css'
import LocationIcon from '../assets/location-icon.svg?react'

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
      <TaskbarLocation />
    </div>
  )
}

const TaskbarLocation = () => {
  return (
    <div className={styles.taskbar_location}>
      <LocationIcon className={styles.taskbar_location_icon} stroke="white" />
      <p>Auckland, New Zealand</p>
    </div>
  )
}

export default DesktopShell
