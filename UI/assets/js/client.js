/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
const btn = document.getElementsByClassName('btn');
const modal1 = document.getElementById('modal1');
const span1 = document.getElementsByClassName('closer1')[0];
const formBtn = document.getElementById('form-btn');
const modal2 = document.getElementById('modal2');
const span2 = document.getElementsByClassName('closer2')[0];
const cancel = document.getElementById('cancel');
const confirm = document.getElementById('confirm');
const modal3 = document.getElementById('modal3');
const span3 = document.getElementsByClassName('closer3')[0];
const statusBtn = document.getElementById('banner-btn');
const modal4 = document.getElementById('modal4');
const span4 = document.getElementsByClassName('closer4')[0];
const statusBtn2 = document.getElementById('banner-btn2');
const modal5 = document.getElementById('modal5');
const del = document.getElementById('del-btn');
const span5 = document.getElementsByClassName('closer5')[0];
const cancel1 = document.getElementById('cancel1');
const date = document.getElementById('date');
const mobileBtn = document.querySelector('#openBtn');
const sidebar = document.getElementById('mySidebar');
const main = document.getElementById('main-content');
const _top = document.querySelector('.top');
const _middle = document.querySelector('.middle');
const _bottom = document.querySelector('.bottom');
const input1 = document.getElementById('inpt1');
const input2 = document.getElementById('inpt2');
const err = document.getElementById('err');

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
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', () => {
    modal1.style.display = 'block';
  });
}


if (formBtn) {
  formBtn.addEventListener('click', () => {
    if (input1.value === '' || input2.value === '') {
      err.innerHTML = '<h3> Empty input(s) </h3>';
      return;
    }
    if (Number.isNaN(Number(input1.value)) || Number.isNaN(Number(input2.value))) {
      err.innerHTML = '<h3> Only Numbers are allowed </h3>';
      return;
    }
    if (input2.value > 12) {
      err.innerHTML = '<h3> Loan Tenor can not be more than 12months </h3>';
      return;
    }
    err.style.display = 'none';
    modal2.style.display = 'block';
  });
  span1.addEventListener('click', () => {
    modal1.style.display = 'none';
  });
}
span2.addEventListener('click', () => {
  modal2.style.display = 'none';
});
cancel.addEventListener('click', () => {
  modal2.style.display = 'none';
});
confirm.addEventListener('click', () => {
  modal3.style.display = 'block';
  modal1.style.display = 'none';
  modal2.style.display = 'none';
});
span3.addEventListener('click', () => {
  modal3.style.display = 'none';
});

statusBtn.addEventListener('click', () => {
  modal4.style.display = 'block';
});
span4.addEventListener('click', () => {
  modal4.style.display = 'none';
});
statusBtn2.addEventListener('click', () => {
  modal1.style.display = 'block';
  modal4.style.display = 'none';
});
del.addEventListener('click', () => {
  modal5.style.display = 'block';
});
span5.addEventListener('click', () => {
  modal5.style.display = 'none';
});
cancel1.addEventListener('click', () => {
  modal5.style.display = 'none';
});
window.addEventListener('click', (event) => {
  if (event.target === modal1) {
    modal1.style.display = 'none';
  } else if (event.target === modal2) {
    modal3.style.display = 'none';
  } else if (event.target === modal3) {
    modal3.style.display = 'none';
  } else if (event.target === modal4) {
    modal4.style.display = 'none';
  } else if (event.target === modal5) {
    modal5.style.display = 'none';
  }
});
