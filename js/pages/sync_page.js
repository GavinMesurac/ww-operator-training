import { pushToCloudSim, pullFromCloudSim, inspectCloudSim } from "../core/cloud_sync.js"

function setStatus(msg){
  document.querySelector("#syncStatus").textContent = msg
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#pushBtn").addEventListener("click", () => {
    const res = pushToCloudSim()
    setStatus(res.message)
  })

  document.querySelector("#pullBtn").addEventListener("click", () => {
    const res = pullFromCloudSim()
    setStatus(res.message)
  })

  document.querySelector("#inspectBtn").addEventListener("click", () => {
    document.querySelector("#cloudPreview").textContent = JSON.stringify(inspectCloudSim(), null, 2)
    setStatus("Cloud sim data loaded.")
  })
})
