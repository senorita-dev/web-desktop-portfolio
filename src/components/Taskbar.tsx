import styles from './Taskbar.module.css'
import LocationIcon from '../assets/location-icon.svg?react'
import { useEffect, useRef, useState } from 'react'

const Taskbar = () => {
  return (
    <div className={styles.taskbar}>
      <p>Taskbar</p>
      <TaskbarLocation />
      <TaskbarDateTime />
    </div>
  )
}

const TaskbarLocation = () => {
  return (
    <div className={styles.taskbar_location}>
      <LocationIcon className={styles.taskbar_location_icon} stroke="white" />
      <p>Auckland, New Zealand</p>
    </div>
  )
}

const dateFormatter = new Intl.DateTimeFormat('en-NZ', {
  timeZone: 'Pacific/Auckland',
  dateStyle: 'short',
})
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

  const date = dateFormatter.format(datetime)
  const time = timeFormatter.format(datetime)

  return (
    <div className={styles.taskbar_datetime}>
      <span>{time}</span>
      <span>{date}</span>
    </div>
  )
}

export default Taskbar
