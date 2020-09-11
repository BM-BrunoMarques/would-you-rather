import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import NavMenuBar from './NavMenuBar'
import QuestionDetails from './QuestionDetails'
import LoginPage from './LoginPage'
import '../App.css'

class App extends Component {
  state = {
    loading: true
  }
  componentDidMount () {
    this.props.handleInitialData()
    this.setState({
      loading: false
    });
  }
  render() {
    console.log(this.state.loading)
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.state.loading === true
              ? null
              : this.props.loggedIn === true
                ?  <div>
                    <NavMenuBar />
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/NewQuestion' exact component={NewQuestion} />
                    <Route path='/LeaderBoard' exact component={LeaderBoard} />
                    <Route path='/question/:id' component={QuestionDetails} />
                  </div>
                : <div> <LoginPage /> </div>
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
    loading: state.authedUser === null
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
