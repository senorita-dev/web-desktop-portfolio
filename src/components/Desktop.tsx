import styles from 'src/components/Desktop.module.css'
import DesktopItem from 'src/components/DesktopItem'

const Desktop = () => {
  return (
    <div className={styles.desktop}>
      <DesktopBackground />
      <DesktopGrid />
    </div>
  )
}

const DesktopBackground = () => {
  return <div className={styles.desktopBackground} />
}

const DesktopGrid = () => {
  return (
    <div className={styles.desktopGrid}>
      <DesktopItem row={4} column={7} />
    </div>
  )
}

export default Desktop
