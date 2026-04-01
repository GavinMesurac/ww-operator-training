import { Storage } from "./storage.js"

function id(){
  return "sess_" + Math.random().toString(36).slice(2,10)
}

export function createSession(mode, settings = {}){
  const session = {
    id: id(),
    mode,
    settings,
    started_at: Date.now(),
    completed_at: null,
    current_index: 0,
    questions: [],
    answers: {},
    marked: [],
    score: { correct: 0, incorrect: 0, percent: 0 }
  }
  Storage.saveSession(session)
  return session
}

export function loadSession(){
  return Storage.loadSession()
}

export function saveSession(session){
  Storage.saveSession(session)
}

export function answerQuestion(session, questionId, selectedIndex){
  session.answers[questionId] = selectedIndex
  saveSession(session)
  return session
}

export function nextQuestion(session){
  if(session.current_index < session.questions.length - 1){
    session.current_index++
  }
  saveSession(session)
}

export function prevQuestion(session){
  if(session.current_index > 0){
    session.current_index--
  }
  saveSession(session)
}

export function toggleMark(session, questionId){
  if(session.marked.includes(questionId)){
    session.marked = session.marked.filter(x => x !== questionId)
  } else {
    session.marked.push(questionId)
  }
  saveSession(session)
}

export function scoreSession(session, gradedFilter = null){
  let questions = session.questions
  if(typeof gradedFilter === "function"){
    questions = questions.filter(gradedFilter)
  }
  const correct = questions.filter(q => session.answers[q.id] === q.correct_index).length
  session.score.correct = correct
  session.score.incorrect = questions.length - correct
  session.score.percent = questions.length ? Math.round(correct / questions.length * 100) : 0
  session.completed_at = Date.now()
  saveSession(session)
  return session
}
