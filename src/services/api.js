const baseUrl = 'http://localhost:3000/tasks'

export const loadTasks = async () => {
  try {
    const res = await fetch(baseUrl)
    const data = await res.json()
  } catch(error) {
    console.error('Error fetching tasks:', error);
  }
}

export const addTask = async(task) => {
  const res = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json'}
    }
  )
  if (res.error) {
    console.log(res.error);
  }
}

export const removeTask = async(id) => {
  const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    }
  )
  if (res.error) {
    console.log(res.error);
  }
}

export const toggleFav = async(id) => {
  const res = await fetch(baseUrl + id, {
      method: 'PATCH',
      body: JSON.stringify(id),
      headers: {'Content-Type': 'application/json'}
    }
  )
  if (res.error) {
    console.log(res.error);
  }      
}

export const updateTask = async(id, updatedTask) =>{
  const res = await fetch(baseUrl + id, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {'Content-Type': 'application/json'}
    }
  )
  if (res.error) {
    console.log(res.error);
  }   
}