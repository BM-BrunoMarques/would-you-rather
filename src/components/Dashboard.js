import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux'
import QuestionPreview from './QuestionPreview'

class Dashboard extends Component {

  render() {
    console.log(this.props)
    const {authedUser, answeredQ, unansweredQ} = this.props

    return (
      <div className='dashboard'>

        <Tabs>
         <TabList>
           <Tab>Answered Questions</Tab>
           <Tab>Unanswered Questions</Tab>
         </TabList>

         <TabPanel>
          {answeredQ.map((id) => (
            <QuestionPreview  key={id} id={id} />
          ))}
         </TabPanel>
         <TabPanel>
          {unansweredQ.map((id) => (
            <QuestionPreview  key={id} id={id} />
          ))}
         </TabPanel>
       </Tabs>



      </div>
    )
  }
}


function mapStateToProps ({ questions, users, authedUser }) {

  let answeredQ = Object.keys(users[authedUser].answers)
                    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)

  const unansweredQ = Object.keys(questions).filter((Q) => !answeredQ.includes(Q))
                      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  return {
    answeredQ: answeredQ,
    unansweredQ: unansweredQ,
    authedUser
  }
}



export default connect(mapStateToProps)(Dashboard)
