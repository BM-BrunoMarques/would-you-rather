import { getInitialData } from '../Utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'

//BFM DELETE
const AUTHED_ID = 'johndoe'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        //BFM TODO: Create a LOGIN method
      })
  }
}
