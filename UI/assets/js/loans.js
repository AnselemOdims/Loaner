const modal1 = document.getElementById('modal1')
const btn1 = document.getElementsByClassName('btn1')
const close1 = document.getElementsByClassName('close1')[0]
const modal2 = document.getElementById('modal2')
const btn2 = document.getElementsByClassName('btn2')
const close2 = document.getElementsByClassName('close2')[0]
const modal4 = document.getElementById('modal4')
const btn4 = document.getElementById('btn4')
const close4 = document.getElementsByClassName('close4')[0]
const modal5 = document.getElementById('modal5')
const btn5 = document.getElementById('btn5')
const close5 = document.getElementsByClassName('close5')[0]
const btn3 = document.getElementById('btn3')
const modal6 = document.getElementById('modal6')
const close6 = document.getElementsByClassName('close6')[0]
const inputBox = document.getElementById('inpt1')
const displayBox = document.getElementById('display')
const errMsg = document.getElementsByClassName('err-output')[0]
const bttn1 = document.getElementById('btn7')
const modal7 = document.getElementById('modal7')
const close7 = document.getElementsByClassName('close7')[0]

for (let i = 0; i < btn1.length; i++) {
    btn1[i].addEventListener('click', () => {
        modal1.style.display = 'block'
    })
}

close1.addEventListener('click', () => {
    modal1.style.display = 'none'
})

for (let i = 0; i < btn2.length; i++) {
    btn2[i].addEventListener('click', () => {
        modal2.style.display = 'block'
    })
}

close2.addEventListener('click', () => {
    modal2.style.display = 'none'
})

btn4.addEventListener('click', () => {
    modal4.style.display = 'block'
    modal2.style.display = 'none'
})

close4.addEventListener('click', () => {
    modal4.style.display = 'none'
})
btn5.addEventListener('click', () => {
    modal5.style.display = 'block'
    modal2.style.display = 'none'
})

close5.addEventListener('click', () => {
    modal5.style.display = 'none'
})
btn3.addEventListener('click', ()=> {
    modal6.style.display = 'block'
    modal1.style.display = 'none'
})
close6.addEventListener('click', () => {
    modal6.style.display = 'none'
})
window.addEventListener('click', event => {
    if (event.target === modal1) {
        modal1.style.display = 'none'
    }
    if (event.target === modal2) {
        modal2.style.display = 'none'
    }
    if (event.target === modal4) {
        modal4.style.display = 'none'
    }
    if (event.target === modal5) {
        modal5.style.display = 'none'
    }
})

if (inputBox) {
  inputBox.onkeyup = () => {
    const valued = inputBox.value
    const result = 50000 - valued
    if (isNaN(valued)) {
      errMsg.innerHTML = `<p style='color:red; text-align: center'>Only NUMBERS are allowed. Please avoid using a letter or special characters</p>`
      return;
    }
    displayBox.innerHTML = `<p style='text-align:center; font-size: 22px'> &#8358;${result}</p>` ;
  }
}
bttn1.addEventListener('click', () => {
  modal7.style.display = 'block';
  modal6.style.display = 'none'
})
close7.addEventListener('click', () => {
  modal7.style.display = 'none'
})
