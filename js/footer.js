'use strict'

export function footerYear(){
  document.getElementById('year').textContent = new Date().getFullYear();
}