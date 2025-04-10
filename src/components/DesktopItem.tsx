import styles from 'src/components/DesktopItem.module.css'
import { CSSProperties } from 'react'

interface DesktopItemProps {
  row: number
  column: number
}
const DesktopItem = (props: DesktopItemProps) => {
  const { row, column } = props
  const style: CSSProperties = { gridRow: row, gridColumn: column }
  return (
    <div className={styles.desktopItem} style={style}>
      <p>Desktop Item</p>
      <p>row: {row}</p>
      <p>column: {column}</p>
    </div>
  )
}

export default DesktopItem
