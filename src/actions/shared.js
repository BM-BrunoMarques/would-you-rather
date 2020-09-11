import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, saveUserAnswer, saveUserQuestionNew} from '../actions/users'
import { receiveQuestions, saveQuestAnswer, saveQuestionNew } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'



export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}


export function handleSaveAnswer (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const info = {
      authedUser,
      qid,
      answer
    }

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleSaveAnswer: ', e)
        alert('There was an error voting in the question. Try again.')
      })
      .then(() => dispatch(saveQuestAnswer(authedUser,qid,answer)))
      .then(() => dispatch(saveUserAnswer(authedUser,qid,answer)))
  }
}

export function handleSaveQuestionNew (question) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    question.author = authedUser

    return saveQuestion(question)
      .catch((e) => {
        console.warn('Error in handleSaveQuestionNew: ', e)
        alert('There was an error creating the question. Try again.')
      })
      .then((Q) => {
        dispatch(saveQuestionNew(Q))
        dispatch(saveUserQuestionNew(Q.author, Q.id))
      })
  }
}
