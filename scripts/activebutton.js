const room  = document.querySelector('.chat-rooms');
const btns = document.querySelectorAll('.btn'); 

room.addEventListener('click', e => {

 btns.forEach(btn => {

    if(btn.getAttribute('id') === e.target.getAttribute('id'))
      btn.classList.add('active');
    else
      btn.classList.remove('active');
    });
});