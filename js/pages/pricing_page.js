import { getSubscriptionState, setTier } from "../core/subscription_manager.js"

function render(){
  const state = getSubscriptionState()
  document.querySelector("#tierBox").textContent = `Current tier: ${state.tier.toUpperCase()}`
}

window.addEventListener("DOMContentLoaded", () => {
  render()
  document.querySelector("#setFreeBtn").addEventListener("click", () => { setTier("free"); render() })
  document.querySelector("#setProBtn").addEventListener("click", () => { setTier("pro"); render() })
})
