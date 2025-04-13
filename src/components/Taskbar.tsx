import styles from 'src/components/Taskbar.module.css'
import { useEffect, useRef, useState } from 'react'
import WindowsIcon from 'src/assets/icons/windows.png'

const Taskbar = () => {
  return (
    <div className={styles.taskbar}>
      <TaskbarStartButton />
      <TaskbarDateTime />
    </div>
  )
}

const TaskbarStartButton = () => {
  return (
    <div className={`${styles.taskbar_item} ${styles.taskbar_startButton}`}>
      <img src={WindowsIcon} className={styles.taskbar_startButton_icon} />
      <span>Start</span>
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
