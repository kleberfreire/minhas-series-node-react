import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = ({ match }) => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const onChange = evs => {
    setName(evs.target.value)
  }

  useEffect(() => {
    axios
      .get('/api/genres/' + match.params.id)
      .then(res => setName(res.data.name))
  }, [match.params.id])

  const onSave = () => {
    try {
      axios.put('/api/genres/' + match.params.id, {
        name
      }).then(res => {
        setSuccess(true)
      })
    } catch (err) {

    }
  }
  console.log(match)
  if (success) {
    return <Redirect to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Update Genêros</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' value={name} className='form-control' onChange={onChange} id='name' aria-describedby='nameHelp' placeholder='Nome do genêro' />
          <small id='nameHelp' className='form-text text-muted'>Este campo e para criação de um novo genero</small>
          <button type='button' onClick={onSave} className='btn btn-primary'>Salvar</button>
        </div>
      </form>
    </div>
  )
}

export default EditarGenero
