// import React from 'react'
import TaskCard from './TaskCard'
import type { Task, CSSProperties } from '../../../../types'
import { useState } from 'react'
import TaskModal from '../shared/TaskModal'
import { TASK_PROGRESS_ID } from '../../../../constants/app'

interface TaskColumnProps {
  columnTitle: string
  tasks: Task[]
}

const TaskColumn = ({ columnTitle, tasks }: TaskColumnProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  let defaultProgress = TASK_PROGRESS_ID.NOT_STARTED;

  if (columnTitle === 'In Progress') {
    defaultProgress = TASK_PROGRESS_ID.IN_PROGRESS;
  }if(columnTitle === 'Waiting/In Review'){
    defaultProgress = TASK_PROGRESS_ID.WAITING;

  } else if (columnTitle === 'Completed') {
    defaultProgress = TASK_PROGRESS_ID.COMPLETED;
  }
  return (
    <div style={styles.categoryColumn}>
      <div style={styles.columnTitleWrapper}>
        <h2 style={styles.categoryTitle}>{columnTitle}</h2>
        <div className="material-icons" style={styles.plusIcon} onClick={(): void => {
            setIsModalOpen(true)
          }}>
          add
        </div>
        {isModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          type="type"
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={defaultProgress}
          selectedData={{} as Task}
        />
      )}
      </div>
      <div>
        {tasks.map((task: Task) => {
          return <TaskCard key={task.id} task={task} />
        })}
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  plusIcon: {
    cursor: 'pointer',
  },
  categoryColumn: {
    width: '22%',
  },
  columnTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px',
  },
}

export default TaskColumn