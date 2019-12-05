import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import BuskCreate from '../Busks/BuskCreate.js'
import Busks from '../Busks/Busks.js'
import Busk from '../Busks/Busk.js'
import BuskUpdate from '../Busks/BuskUpdate.js'
import HashHome from '../Busks/HashHome.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <HashHome />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <Route user={user} exact path='/home' render={() => (
            <Busks alert={this.alert} user={user}/>
          )} />
          <Route user={user} exact path='/busks/:id' render={() => (
            <Busk alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/create-busk' render={() => (
            <BuskCreate alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/busks/:id/update-busk' render={() => (
            <BuskUpdate alert={this.alert} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
