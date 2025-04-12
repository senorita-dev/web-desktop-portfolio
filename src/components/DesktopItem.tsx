import styles from 'src/components/DesktopItem.module.css'
import { CSSProperties } from 'react'

export interface DesktopItemProps {
  row: number
  col: number
  title: string
  icon: string
}
const DesktopItem = (props: DesktopItemProps) => {
  const { row, col, title, icon } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  return (
    <div className={styles.desktopItem} style={style}>
      <img src={icon} className={styles.desktopItem_image} />
      <span className={styles.desktopItem_title}>{title}</span>
    </div>
  )
}

export default DesktopItem
