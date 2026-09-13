'use strict'
import { loadCartFromStorage } from "./render-cart.js";
import { footerYear } from "./footer.js";


document.getElementById('last-updated').textContent = new Date().getFullYear()

loadCartFromStorage()
footerYear()