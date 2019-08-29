import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () => {
  const [form, setForm] = useState({ name: '', comments: '', genre_id: '' })
  const [data, setData] = useState([])
  const [success, setSuccess] = useState(false)

  const onChange = field => evs => {
    setForm({
      ...form,
      [field]: evs.target.value
    })
  }


  const onSave = () => {
    try {
      axios.post('/api/series', form
      ).then(res => {
        setSuccess(true)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getAllGenero = (item) => {
    return (
      <option key={item.id} value={item.id}>{item.name}</option>
    )
  }

  useEffect(() => {
    axios.get('/api/genres').then((res) => {
      setData(res.data.data)
    })
  }, [])

  const seleciona = (value) => () => {
    setForm({
      ...form,
      status: value
    })
  }


  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div className='container'>
      <h1>Nova Série</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input type='text' value={form.name} className='form-control' onChange={onChange('name')} id='name' aria-describedby='nameHelp' placeholder='Nova Série' />
          <small id='nameHelp' className='form-text text-muted'>Este campo e para criação de uma nova série</small>
        </div>

        <div className='form-group'>
          <select className='form-control' id='selectGenero' aria-describedby='generoHelp' onChange={onChange('genre_id')} defaultValue='nao_definido' >
            <option value='nao_definido' >Selecione um Genêro</option>
            {data.map(getAllGenero)}
          </select>
          <small id='generoHelp' className='form-text text-muted'>Este campo e para escolha de um genero cadastrado</small>
        </div>

        <div className='form-group' >
          <div className='form-check form-check-inline' >
            <input className='form-check-input' type='radio' name='status' id='assistindo' value='ASSISTINDO' onClick={seleciona('ASSISTINDO')} />
            <label className='form-check-label' htmlFor='assistindo'>
              Assistindo
            </label>
          </div>

          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' onClick={seleciona('PARA_ASSISTIR')} />
            <label className='form-check-label' htmlFor='paraAssistir'>
              Para Assistir
            </label>
          </div>
        </div>
        <div className='form-group'>
          <button type='button' onClick={onSave} className='btn btn-primary'>Salvar</button>
        </div>

      </form>
    </div>
  )
}

export default NovaSerie
