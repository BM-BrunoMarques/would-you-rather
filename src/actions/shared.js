import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'

//BFM DELETE
const AUTHED_ID = 'johndoe'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        //BFM TODO: Create a LOGIN method
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}
