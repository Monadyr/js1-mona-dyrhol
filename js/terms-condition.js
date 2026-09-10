'use strict'
import { loadCartFromStorage } from "./render-cart.js";


document.getElementById('last-updated').textContent = new Date().getFullYear()

loadCartFromStorage()