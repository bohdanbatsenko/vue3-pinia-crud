const baseUrl = 'http://localhost:3000/tasks'

export const apiLoadTasks = async () => {
  try {
    const res = await fetch(baseUrl)
    const data = await res.json()
    return data
  } catch(error) {
    console.error('Error fetching tasks:', error);
  }
}

export const apiAddTask = async(task) => {
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json'}
      }
    )
  } catch(error) {
    console.error('Error fetching tasks:', error);
  }
}

export const apiRemoveTask = async(id) => {
  const res = await fetch(baseUrl + '/' + id, {
      method: 'DELETE',
    }
  )
  if (res.error) {
    console.log(res.error);
  }
}

export const apiToggleFav = async(id, taskToFav) => {
  try {
      const res = await fetch(baseUrl + '/' + id, {
        method: 'PATCH',
        body: JSON.stringify(taskToFav),
        headers: {'Content-Type': 'application/json'}
      }
    ) 
    const data = await res.json()
    return data
  } catch(error) {
    console.error('Error fetching tasks:', error);
  }
}

export const apiUpdateTask = async(id, taskToUpdate) =>{
  try {
    const res = await fetch(baseUrl + '/' + id, {
        method: 'PUT',
        body: JSON.stringify(taskToUpdate),
        headers: {'Content-Type': 'application/json'}
      }
    )

  } catch(error) {
    console.error('Error fetching tasks:', error);
  }
}