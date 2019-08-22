import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {
  const [name,setName] = useState('')
  const [success, setSuccess] = useState(false)
  const onChange = evs => {
    setName(evs.target.value)
  }

  const onSave = () => {
    try {
      axios.post('/api/genres', {
        name
      }).then(res => {
        setSuccess(true)
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (success) {
   return <Redirect to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Novo Genêros</h1>
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

export default NovoGenero
