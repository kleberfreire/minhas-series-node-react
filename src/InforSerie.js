import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InforSerie = ({ match }) => {
  const [form, setForm] = useState({ name: '', comments: '', genre_id: '' })
  const [data, setData] = useState([])
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('EDIT')
  const [generos, setGeneros] = useState([])

  useEffect(() => {
    axios.get('/api/series/' + match.params.id)
      .then((res) => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])
  useEffect(() => {
    axios.get('/api/genres')
      .then(res => {
        setGeneros(res.data.data)
      })
  }, [data])

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => evs => {
    setForm({
      ...form,
      [field]: evs.target.value
    })
  }

  const onSave = () => {
    try {
      axios.put('/api/series/' + match.params.id, form)
        .then(res => {
          setSuccess(true)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const seleciona = (value) => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const getAllGenero = (item) => {
    return (

      <option key={item.id} value={item.id}>{item.name}</option>
    )
  }

  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0, 0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white' >{data.name}</h1>
                <div className='lead text-white' >
                  <p> Genero: { data.genre} </p>
                  {data.status === 'ASSISTINDO' && <Badge color='success'>Assistindo</Badge>}
                  {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para Assistir</Badge>}
                  {data.status === 'TERMINADO' && <Badge color='danger'>Terminado</Badge>}

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <button className='btn btn-warning' onClick={() => setMode('EDIT')}>EDITAR</button>
      </div>    
      {
        mode === 'EDIT' &&
          <div className='container' >
            <h1>Editar Serie</h1>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Nome</label>
                <input type='text' value={form.name} className='form-control' onChange={onChange('name')} id='name' aria-describedby='nameHelp' placeholder='Nova Série' />
              </div>
              <div className='form-group'>
                <label htmlFor='commnent'>Comentários</label>
                <input type='textArea' value={form.comments} className='form-control' onChange={onChange('comments')} id='commnent' aria-describedby='commnentHelp' placeholder='Digite seu comentário' />
              </div>

              <div className='form-group'>
                <label htmlFor='generosSelect'>Genêros</label>
                <select className='form-control' id='generosSelect' aria-describedby='generoHelp' value={form.genre_id}onChange={onChange('genre_id')} >
                  {generos.length > 0 ? generos.map(getAllGenero) : <option key={0} value={null}>Não existe Genêro</option>}
                </select>
              </div>

              <div className='form-group'>
                <div className='form-check form-check-inline' >
                  <input className='form-check-input' type='radio' name='status' id='assistindo' value='ASSISTINDO' onChange={seleciona('ASSISTINDO')} checked={form.status === 'ASSISTINDO'}  />
                  <label className='form-check-label' htmlFor='assistindo'>
                    Assistindo
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input className='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')}  checked={form.status === 'PARA_ASSISTIR'}  />
                  <label className='form-check-label' htmlFor='paraAssistir'>
                    Para Assistir
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input className='form-check-input' type='radio' name='status' id='terminado' value='TERMINADO' onChange={seleciona('TERMINADO')} checked={form.status === 'TERMINADO'} />
                  <label className='form-check-label' htmlFor='terminado'>
                  Terminado
                  </label>
                </div>
              </div>

              <div className='form-group'>
                <button type='button' onClick={onSave} className='btn btn-primary'>Salvar</button>
                <button className='btn btn-danger' onClick={() => setMode('INFOR')}>Cancelar Edição</button>
              </div>

            </form>
          </div>
      }
    </div>

  )
}

export default InforSerie
