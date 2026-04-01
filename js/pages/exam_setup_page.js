window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#startExamBtn").addEventListener("click", () => {
    const difficulty = document.querySelector("#difficultySel").value
    sessionStorage.setItem("ww_exam_setup", JSON.stringify({ count:"110", difficulty }))
    location.href = "exam_run.html"
  })
})
