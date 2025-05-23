import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import {
    horizontalListSortingStrategy,
    SortableContext,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
    CSSProperties,
    MouseEventHandler,
    useEffect,
    useRef,
    useState
} from 'react'
import { useDispatch } from 'react-redux'
import WindowsIcon from 'src/assets/icons/windows.png'
import styles from 'src/components/Taskbar.module.css'
import { useAppSelector } from 'src/redux/hooks'
import { FileDesktopIconState } from 'src/redux/slices/desktopIconsSlice'
import {
    focusWindow,
    minimizeWindow,
    reorderTaskbarWindows,
    unFocusWindows
} from 'src/redux/slices/windowsSlice'

const Taskbar = () => {
  const dispatch = useDispatch()
  const onUnFocusWindows: MouseEventHandler<HTMLDivElement> = (event) => {
    const targetElement = event.target as HTMLElement
    const isTaskbarItem =
      targetElement.closest(`.${styles.taskbar_item}`) !== null
    if (isTaskbarItem) {
      return
    }
    dispatch(unFocusWindows())
  }
  return (
    <div className={styles.taskbar} onClick={onUnFocusWindows}>
      <TaskbarStartButton />
      <TaskbarWindowIcons />
      <TaskbarDateTime />
    </div>
  )
}

const TaskbarStartButton = () => {
  return (
    <div
      className={`${styles.taskbar_item} ${styles.taskbar_item__outset} ${styles.taskbar_startButton}`}
    >
      <img src={WindowsIcon} className={styles.taskbar_startButton_icon} />
      <span>Start</span>
    </div>
  )
}

const TaskbarWindowIcons = () => {
  const state = useAppSelector((state) => state.windows)
  const { windows, isWindowFocused } = state
  const taskbarWindows = [...windows].sort(
    (a, b) => a.taskbarIndex - b.taskbarIndex,
  )
  const topDesktopWindow = [...windows]
    .sort((a, b) => a.desktopIndex - b.desktopIndex)
    .pop()
  const focusedWindow = isWindowFocused ? topDesktopWindow : undefined
  const dispatch = useDispatch()
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = taskbarWindows.find(
        (window) => window.id === active.id,
      )?.taskbarIndex
      const newIndex = taskbarWindows.find(
        (window) => window.id === over.id,
      )?.taskbarIndex
      if (oldIndex === undefined || newIndex === undefined) {
        return
      }
      dispatch(reorderTaskbarWindows({ oldIndex, newIndex }))
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext
        items={taskbarWindows.map((window) => window.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className={styles.taskbar_windowIcons}>
          {taskbarWindows.map(({ id, file }) => (
            <TaskbarWindowIcon
              key={id}
              id={id}
              file={file}
              isWindowFocused={id === focusedWindow?.id}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

interface TaskbarWindowIconProps {
  id: string
  file: FileDesktopIconState
  isWindowFocused: boolean
}
const TaskbarWindowIcon = (props: TaskbarWindowIconProps) => {
  const { id, file, isWindowFocused } = props
  const title = `${file.title} - ${file.applicationType}`
  const dispatch = useDispatch()
  const onTaskbarIconClick = () => {
    if (isWindowFocused) {
      dispatch(minimizeWindow(id))
    } else {
      dispatch(focusWindow(id))
    }
  }
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })
  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div
      className={`${styles.taskbar_item} ${
        isWindowFocused
          ? styles.taskbar_item__inset
          : styles.taskbar_item__outset
      } ${styles.taskbar_windowIcon}`}
      onClick={onTaskbarIconClick}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        src={file.icon.path}
        alt={file.icon.altText}
        className={styles.taskbar_windowIcon_icon}
      />
      <span className={styles.taskbar_windowIcon_text}>{title}</span>
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
    <div
      className={`${styles.taskbar_item} ${styles.taskbar_item__inset} ${styles.taskbar_datetime}`}
    >
      <span>{time}</span>
    </div>
  )
}

export default Taskbar
