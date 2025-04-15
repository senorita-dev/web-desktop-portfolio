import styles from 'src/components/Desktop.module.css'
import DesktopItem, { DesktopItemProps } from 'src/components/DesktopItem'

interface DesktopProps {
  items: DesktopItemProps[]
}
const Desktop = (props: DesktopProps) => {
  const { items } = props
  return (
    <div className={styles.desktop}>
      {items.map((item, index) => (
        <DesktopItem key={index} {...item} />
      ))}
    </div>
  )
}

export default Desktop
