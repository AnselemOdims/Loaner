let btn = document.getElementsByClassName('btn')
let modal1 = document.getElementById('modal1')
let span1 = document.getElementsByClassName('closer1')[0]
let formBtn = document.getElementById('form-btn')
let modal2 = document.getElementById('modal2')
let span2 = document.getElementsByClassName('closer2')[0]
let cancel = document.getElementById('cancel')
let confirm = document.getElementById('confirm')
let modal3 = document.getElementById('modal3')
let span3 = document.getElementsByClassName('closer3')[0]
let statusBtn = document.getElementById('banner-btn')
let modal4 = document.getElementById('modal4')
let span4 = document.getElementsByClassName('closer4')[0]
let statusBtn2 = document.getElementById('banner-btn2')
let modal5 = document.getElementById('modal5')
let del = document.getElementById('del-btn')
let span5 = document.getElementsByClassName('closer5')[0]
let cancel1 = document.getElementById('cancel1')

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        modal1.style.display = 'block'
    })
}

span1.addEventListener('click', () => {
    modal1.style.display = 'none'
})

formBtn.addEventListener('click', () => {
    modal2.style.display = 'block'
})
span2.addEventListener('click', () => {
    modal2.style.display = 'none'
})
cancel.addEventListener('click', () => {
    modal2.style.display = 'none'
})
confirm.addEventListener('click', () => {
    modal3.style.display = 'block'
    modal1.style.display = 'none'
    modal2.style.display = 'none'
})
span3.addEventListener('click', () => {
    modal3.style.display = 'none'
})

statusBtn.addEventListener('click', () => {
    modal4.style.display = 'block'
})
span4.addEventListener('click', () => {
    modal4.style.display = 'none'
})
statusBtn2.addEventListener('click', () => {
    modal1.style.display = 'block'
    modal4.style.display = 'none'
})
del.addEventListener('click', () => {
    modal5.style.display = 'block'
})
span5.addEventListener('click', () => {
    modal5.style.display = 'none'
})
cancel1.addEventListener('click', () => {
    modal5.style.display = 'none'
})
window.addEventListener('click', (event)=>{
    if(event.target === modal1){
        modal1.style.display = 'none'
    }
    else if(event.target === modal2){
        modal3.style.display = 'none'
    }
    else if(event.target === modal3){
        modal3.style.display = 'none'
    }
    else if(event.target === modal4){
        modal4.style.display = 'none'
    }
    else if(event.target === modal5){
        modal5.style.display = 'none'
    }
})
let slider1 = document.getElementById('myRange1')
let output1 = document.getElementById('amount1')
let slider2 = document.getElementById('myRange2')
let output2 = document.getElementById('amount2')

const slide1 = () => {
    output1.innerHTML = slider1.value
}
slider1.oninput = slide1
const slide2 = () => {
    output2.innerHTML = slider2.value
}
slider2.oninput = slide2
