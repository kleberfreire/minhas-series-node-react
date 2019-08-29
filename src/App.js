import React from 'react'
import Header from './MenuTop'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Generos from './generos'
import Series from './series'
import NovaSerie from './NovaSerie'
import InforSerie from './InforSerie'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const Home = () => {
  return <h1>home</h1>
}

function App () {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/generos' component={Generos} />
          <Route exact path='/generos/novo' component={NovoGenero} />
          <Route exact path='/generos/:id' component={EditarGenero} />
          <Route exact path='/series' component={Series} />
          <Route exact path='/series/novo' component={NovaSerie} />
          <Route exact path='/series/:id' component={InforSerie} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
