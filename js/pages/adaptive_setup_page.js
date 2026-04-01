window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#startAdaptiveBtn").addEventListener("click", () => {
    const count = document.querySelector("#countSel").value
    const difficulty = document.querySelector("#difficultySel").value
    sessionStorage.setItem("ww_adaptive_setup", JSON.stringify({ count, difficulty }))
    location.href = "adaptive_run.html"
  })
})
