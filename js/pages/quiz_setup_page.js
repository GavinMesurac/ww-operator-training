window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#startQuizBtn").addEventListener("click", () => {
    const count = document.querySelector("#countSel").value
    const difficulty = document.querySelector("#difficultySel").value
    sessionStorage.setItem("ww_quiz_setup", JSON.stringify({ count, difficulty }))
    location.href = "quiz_run.html"
  })
})
