import React, { createContext, useState, useEffect } from 'react'
import uuid from 'uuid'

export const TaskListContext = createContext()

const TaskListContextProvider = (props) => {
  // initial storage and getting the values
  const initialState = JSON.parse(localStorage.getItem('tasks')) || []

  const [tasks, setTasks] = useState(initialState)

  // to update the local storage
  useEffect(() => {
    // takes 2 options the collecction name
    // and the tasks array name
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [editItem, setEditItem] = useState(null)

  // Add tasks
  const addTask = (title) => {
    // just like pushing and item to the end of an array
    // but this one is first spread the former array or object
    // and then add the newly created title and the generated id to the
    // aray too, copy the former and add the new one togetjer with inside the tasks array
    setTasks([...tasks, { title, id: uuid() }])
  }

  // Remove tasks
  const removeTask = (id) => {
    // returns any task that doesn't match the clicked id back to the task array
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Clear tasks
  const clearList = () => {
    // set to anempty aray
    setTasks([])
  }

  // Find task
  const findItem = (id) => {
    // pass the value that matches the clicked value to the
    // editItem: (array, string, numer), initially null
    // with this the editItem state now has value that will allow the
    // useEffect life cycle to update and display the editItem value to the input
    // controlled value input (with the id noted/identified for the change)
    const item = tasks.find((task) => task.id === id)

    setEditItem(item)
  }

  // Edit task
  const editTask = (title, id) => {
    // takes 2 item
    const newTasks = tasks.map((task) =>
      // check to see if the clicked item id matches any one in the array
      // if yes then return the editedItm that findItem() pushed to the input box
      // else return the current task instead
      task.id === id ? { title, id } : task
                               
       // or still return all the ...tasks and including the newly updated item or return the previous task
      // when the ids doesn't match
      // task.id === id ? [...tasks, {title, id}] : task;
    )

    console.log(newTasks)

    setTasks(newTasks)
    setEditItem(null)
  }

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  )
}

export default TaskListContextProvider
