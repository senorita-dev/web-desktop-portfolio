import styles from 'src/components/Taskbar.module.css'
import { useEffect, useRef, useState } from 'react'

const Taskbar = () => {
  return (
    <div className={styles.taskbar}>
      <TaskbarDateTime />
    </div>
  )
}

const timeFormatter = new Intl.DateTimeFormat('en-NZ', {
  timeZone: 'Pacific/Auckland',
  timeStyle: 'short',
})

const TaskbarDateTime = () => {
  const [datetime, setDatetime] = useState(new Date())
  const datetimeRef = useRef(new Date())

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      if (datetimeRef.current.getMinutes() !== now.getMinutes()) {
        datetimeRef.current = now
        setDatetime(now)
      }
    }
    const clock = setInterval(updateDateTime, 1000)
    return () => clearInterval(clock)
  }, [])

  const time = timeFormatter.format(datetime).toUpperCase()

  return (
    <div className={`${styles.taskbar_item} ${styles.taskbar_datetime}`}>
      <span>{time}</span>
    </div>
  )
}

export default Taskbar
