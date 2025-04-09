import styles from './Desktop.module.css'
import DesktopItem from './DesktopItem'

const Desktop = () => {
  return (
    <div className={styles.desktop}>
      <DesktopBackground />
      <DesktopGrid />
    </div>
  )
}

const DesktopBackground = () => {
  return (
    <div className={styles.desktopBackground}>
      <p>Desktop Background</p>
    </div>
  )
}

const DesktopGrid = () => {
  return (
    <div className={styles.desktopGrid}>
      <DesktopItem row={4} column={7} />
    </div>
  )
}

export default Desktop
