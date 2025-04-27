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
  const { windows } = state
  return (
    <div className={styles.desktopWindows}>
      {windows
        .filter((windowItem) => !windowItem.isMinimized)
        .map((windowItem, index) => (
          <DesktopWindow
            key={windowItem.id}
            desktopWindow={windowItem}
            zOrder={index + 1}
          />
        ))}
    </div>
  )
}

export default Desktop
