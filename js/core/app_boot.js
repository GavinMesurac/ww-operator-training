export function runBootChecks(){
  const warnings = []
  try{
    localStorage.setItem("__ww_test__", "1")
    localStorage.removeItem("__ww_test__")
  }catch(e){
    warnings.push("localStorage is unavailable; saving will not work.")
  }
  if(location.protocol === "file:"){
    warnings.push("Running from file:// may work, but static hosting is recommended.")
  }
  return warnings
}
