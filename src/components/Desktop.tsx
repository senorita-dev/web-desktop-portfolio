import { useContext } from 'react'
import styles from 'src/components/Desktop.module.css'
import DesktopIcon from 'src/components/DesktopIcon'
import AppContext from 'src/contexts/AppContext'

const Desktop = () => {
  return (
    <div className={styles.desktop}>
      <DesktopIcons />
    </div>
  )
}

const DesktopIcons = () => {
  const { desktopIcons } = useContext(AppContext)
  return (
    <div className={styles.desktopIcons}>
      {desktopIcons.map((desktopIcon, index) => (
        <DesktopIcon key={index} {...desktopIcon} />
      ))}
    </div>
  )
}

export default Desktop
