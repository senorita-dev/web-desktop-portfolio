import styles from 'src/components/Desktop.module.css'
import DesktopItem, { DesktopItemProps } from 'src/components/DesktopItem'

interface DesktopProps {
  items: DesktopItemProps[]
}
const Desktop = (props: DesktopProps) => {
  const { items } = props
  return (
    <div className={styles.desktop}>
      <DesktopBackground />
      <DesktopGrid items={items} />
    </div>
  )
}

const DesktopBackground = () => {
  return <div className={styles.desktopBackground} />
}

interface DesktopGridProps {
  items: DesktopItemProps[]
}
const DesktopGrid = (props: DesktopGridProps) => {
  const { items } = props
  return (
    <div className={styles.desktopGrid}>
      {items.map((item, index) => (
        <DesktopItem key={index} {...item} />
      ))}
    </div>
  )
}

export default Desktop
