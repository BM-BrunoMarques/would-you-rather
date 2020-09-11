import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import NavMenuBar from './NavMenuBar'
import QuestionDetails from './QuestionDetails'
import LoginPage from './LoginPage'
import NotFound from './NotFound'

import '../App.css'

class App extends Component {
  state = {
    loading: true
  }
  componentDidMount () {
    this.props.handleInitialData()
  }
  render() {
    console.log(this.state.loading)
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <NavMenuBar />
{this.props.loggedIn === false
            ? <div className='wraper'>
                <Route component={LoginPage}/>
              </div>
            : <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/add' exact component={NewQuestion} />
                <Route path='/leaderboard' exact component={LeaderBoard} />
                <Route path='/question/:id' component={QuestionDetails} />
                <Route path='*' component={NotFound} />
              </Switch>
}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    loggedIn: state.authedUser !== null,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
