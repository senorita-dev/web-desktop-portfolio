import { useContext } from 'react'
import styles from 'src/components/Desktop.module.css'
import DesktopItem from 'src/components/DesktopItem'
import AppContext from 'src/contexts/AppContext'

const Desktop = () => {
  const { desktopItems } = useContext(AppContext)
  return (
    <div className={styles.desktop}>
      {desktopItems.map((item, index) => (
        <DesktopItem key={index} {...item} />
      ))}
    </div>
  )
}

export default Desktop
