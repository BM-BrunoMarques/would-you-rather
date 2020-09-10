import { saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function saveQuestAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
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
      .then((answer) => dispatch(saveQuestAnswer(authedUser,qid,answer)))
  }
}
