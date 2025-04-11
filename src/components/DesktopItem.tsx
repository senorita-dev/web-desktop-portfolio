import styles from 'src/components/DesktopItem.module.css'
import { CSSProperties } from 'react'

export interface DesktopItemProps {
  row: number
  col: number
}
const DesktopItem = (props: DesktopItemProps) => {
  const { row, col } = props
  const style: CSSProperties = { gridRow: row, gridColumn: col }
  return (
    <div className={styles.desktopItem} style={style}>
      <p>Desktop Item</p>
      <p>row: {row}</p>
      <p>column: {col}</p>
    </div>
  )
}

export default DesktopItem
