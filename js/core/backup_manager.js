import { getProgress, saveProgress } from "./progress_tracker.js"

export function exportProgress(){
  const blob = new Blob([JSON.stringify(getProgress(), null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "ww_progress_backup.json"
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function importProgress(file){
  const reader = new FileReader()
  reader.onload = () => {
    try{
      const data = JSON.parse(reader.result)
      saveProgress(data)
      alert("Progress imported successfully.")
      location.reload()
    }catch(e){
      alert("Invalid file.")
    }
  }
  reader.readAsText(file)
}
