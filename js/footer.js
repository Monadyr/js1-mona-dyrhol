'use strict'
/**
 * Get year for footer
 */
export function footerYear(){
  document.getElementById('year').textContent = new Date().getFullYear();
}