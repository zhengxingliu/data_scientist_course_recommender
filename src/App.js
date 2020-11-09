import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"


import "./App.css"
import { Navbar } from "./components"
import { routes } from './routes'

function App() {
  return (
    <Navbar>
      <Switch>
        {
          routes.map(route => {
            return (
              <Route 
                key={route.pathname}
                path={route.pathname}
                exact={true}
                render={routerProps => {
                  return <route.component {...routerProps}/>
                }}
              />
            )
          })
        }
        {/* redirect to dashboard */}
        <Redirect to={routes[1].pathname} from='/' exact />
      </Switch>
    </Navbar>
  )
}

export default App
