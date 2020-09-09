import React, { Component } from 'react';
import { connect } from 'react-redux'

class Dashboard extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <ul>
          {this.props.questIds.map((Qid) => (
            <li key={Qid}>
              Question ID: ${Qid}
            </li>)
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)
