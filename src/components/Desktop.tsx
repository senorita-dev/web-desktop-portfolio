import styles from 'src/components/Desktop.module.css'
import DesktopIcon from 'src/components/DesktopIcon'
import DesktopWindow from 'src/components/DesktopWindow'
import { useAppSelector } from 'src/redux/hooks'

const Desktop = () => {
  return (
    <div className={styles.desktop}>
      <DesktopWindows />
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

const DesktopWindows = () => {
  const state = useAppSelector((state) => state.windows)
  const { desktopWindows } = state
  return (
    <div className={styles.desktopWindows}>
      {desktopWindows
        .filter((desktopWindow) => !desktopWindow.isMinimized)
        .map((desktopWindow, index) => (
          <DesktopWindow
            key={desktopWindow.id}
            desktopWindow={desktopWindow}
            zOrder={index}
          />
        ))}
    </div>
  )
}

export default Desktop
