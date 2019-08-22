import React from 'react'
import Header from './MenuTop'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Generos from './generos'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
const Home = () => {
  return <h1>home</h1>
}

function App () {
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/generos/novo' exact component={NovoGenero} />
        <Route path='/generos/:id' exact component={EditarGenero} />
        <Route path='/generos' exact component={Generos} />

      </div>
    </Router>
  )
}

export default App
