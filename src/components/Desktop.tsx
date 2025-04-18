import { useContext } from 'react'
import styles from 'src/components/Desktop.module.css'
import DesktopIcon from 'src/components/DesktopIcon'
import AppContext from 'src/contexts/AppContext'
import Window from 'src/components/Window'

const Desktop = () => {
  return (
    <div className={styles.desktop}>
      <Windows />
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

const Windows = () => {
  const { windows } = useContext(AppContext)
  return (
    <div className={styles.windows}>
      {windows.map((window, index) => (
        <Window key={index} {...window} />
      ))}
    </div>
  )
}

export default Desktop
