/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

// open side navigation on small screens
const _top = document.querySelector('.top');
const _middle = document.querySelector('.middle');
const _bottom = document.querySelector('.bottom');
const mobileBtn = document.querySelector('#openBtn');
const sidebar = document.getElementById('mySidebar');
const main = document.getElementById('main-content');
const btn = document.getElementById('btn');
const modal = document.getElementById('modal');
const input = document.getElementsByClassName('form-controls')[0];
const principal = document.querySelector('#inpt1');
const months = document.getElementById('inpt2');
const result = document.querySelector('.result');
const estBtn = document.querySelector('.est-btn');
const errMsg = document.querySelector('.err-output');
const date = document.getElementById('date');

window.addEventListener('load', () => {
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      if (mobileBtn.classList.contains('menu-close')) {
        mobileBtn.classList.remove('menu-close');
        sidebar.style.width = '250px';
        main.style.marginLeft = '150px';
        _top.style.transform = 'rotate(-.125turn)';
        _middle.style.visibility = 'hidden';
        _bottom.style.transform = 'rotate(.125turn)';
      } else {
        mobileBtn.classList.add('menu-close');
        sidebar.style.width = '0';
        main.style.marginLeft = '0';
        _top.style.transform = 'none';
        _middle.style.visibility = 'visible';
        _bottom.style.transform = 'none';
      }
    });
  }
  if (date) {
    const newDate = new Date();
    date.innerHTML = `<h3 style='color:#4066cb; text-align: center'>${newDate}</h3>`;
  }
  if (input) {
    input.addEventListener('keyup', () => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        setTimeout(() => {
          modal.style.display = 'none';
          window.location.href = './sign_in.html';
        }, 3000);
      });
    });
  }


  if (estBtn) {
    estBtn.addEventListener('click', () => {
      const x = principal.value;
      const y = months.value;
      if (isNaN(x) || isNaN(y)) {
        errMsg.innerHTML = '<p style=\'color:red; text-align: center\'>Only NUMBERS are allowed. Please avoid using a letter or special characters</p>';
        return;
      }
      const amount = (Math.pow((0.05 / y + 1), y)) * x;
      const sum = amount.toFixed(2);
      result.innerHTML = `<p style='text-align:center; font-size: 18px'> &#8358;${sum}</p>`;
    });
  }

});
