import styles from 'src/components/Desktop.module.css'
import DesktopIcon from 'src/components/DesktopIcon'
import Window from 'src/components/Window'
import { useAppSelector } from 'src/redux/hooks'

const Desktop = () => {
  return (
    <div className={styles.desktop}>
      <Windows />
      <DesktopIcons />
    </div>
  )
}

const DesktopIcons = () => {
  const state = useAppSelector((state) => state.desktopIcons)
  const desktopIcons = state.value
  return (
    <div className={styles.desktopIcons}>
      {desktopIcons.map((desktopIcon, index) => (
        <DesktopIcon key={index} {...desktopIcon} />
      ))}
    </div>
  )
}

const Windows = () => {
  const state = useAppSelector((state) => state.windows)
  const { windows } = state
  return (
    <div className={styles.windows}>
      {windows
        .filter((window) => !window.isMinimized)
        .map((window, index) => (
          <Window key={window.id} window={window} zOrder={index} />
        ))}
    </div>
  )
}

export default Desktop
