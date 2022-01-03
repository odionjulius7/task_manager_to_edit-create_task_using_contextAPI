import React, { useState, useContext, useEffect } from 'react'
import { TaskListContext } from '../contexts/TaskListContext'

const TaskForm = () => {
  const { addTask, clearList, editTask, editItem } = useContext(TaskListContext)
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    // our submit btn set the task title when submitted and genrate an id for using uuid
    // the title value clears from the input box as wel on submission
    e.preventDefault()
    if (!editItem) {
//       we need the add task to pass the inputted title
//       and then setTask() accept
      addTask(title)
      setTitle('')
    } else {
      editTask(title, editItem.id)
//  editItem.title can be change to the new title inputed but the editItem.id remains the same
//       and then push the change to the setTask() object
    }
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    // this right here we use the useEffect life cycle update
    // to set what control form value displays on the input box
    // if editItem has value/or if edit button is clicked then display the
    // editItem.title in d input box as value of the input or an empty string when not clicked(edit btn)
    // note: the edit btn send both the editItem title and id
    if (editItem) {
      setTitle(editItem.title)
      console.log(editItem)
    } else {
      setTitle('')
    }
  }, [editItem])

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Add Task..."
        value={title}
        onChange={handleChange}
        required
        className="task-input"
      />
      <div className="buttons">
        <button type="submit" className="btn add-task-btn">
          {editItem ? 'Edit Task' : 'Add Task'}
        </button>
        <button className="btn clear-btn" onClick={clearList}>
          Clear
        </button>
      </div>
    </form>
  )
}

export default TaskForm
