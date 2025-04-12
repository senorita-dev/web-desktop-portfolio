import styles from 'src/components/DesktopItem.module.css'
import { CSSProperties } from 'react'
import ShortcutOverlay from 'src/assets/icons/overlay_shortcut.png'

export interface DesktopItemProps {
  row: number
  col: number
  title: string
  icon: string
  onOpen?: () => void
  shortcut?: boolean
}
const DesktopItem = (props: DesktopItemProps) => {
  const { row, col, title, icon, onOpen, shortcut } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  return (
    <div className={styles.desktopItem} style={style} onClick={onOpen}>
      <div className={styles.desktopItem_imageContainer}>
        <img src={icon} className={styles.desktopItem_image} />
        {shortcut && (
          <img
            src={ShortcutOverlay}
            className={styles.desktopItem_shortcutOverlay}
          />
        )}
      </div>
      <span className={styles.desktopItem_title}>{title}</span>
    </div>
  )
}

export default DesktopItem
