import styles from 'src/components/DesktopIcon.module.css'
import { CSSProperties } from 'react'
import ShortcutOverlay from 'src/assets/icons/overlay_shortcut.png'

export interface DesktopIconProps {
  row: number
  col: number
  title: string
  icon: string
  onOpen?: () => void
  shortcut?: boolean
}
const DesktopIcon = (props: DesktopIconProps) => {
  const { row, col, title, icon, onOpen, shortcut } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  return (
    <div className={styles.desktopIcon} style={style} onClick={onOpen}>
      <div className={styles.desktopIcon_imageContainer}>
        <img src={icon} className={styles.desktopIcon_image} />
        {shortcut && (
          <img
            src={ShortcutOverlay}
            className={styles.desktopIcon_shortcutOverlay}
          />
        )}
      </div>
      <span className={styles.desktopIcon_title}>{title}</span>
    </div>
  )
}

export default DesktopIcon
