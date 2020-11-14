const switches = document.querySelectorAll('.switch');
const darkModeIcon = document.querySelector('.dark-mode-icon');
const normalModeIcon = document.querySelector('.normal-mode-icon');
const contact__form = document.getElementById('contact__form');
const alert_modal = document.querySelector('.modals');
const dropDown = document.querySelector('.alert');


//---------------SETTING UP THEME-----------------------
let theme = localStorage.getItem('theme');
if(theme == null){
    setupTheme('blue');
}else {
    setupTheme(theme);
}

switches.forEach(item => {
  item.onclick = function() {
      const mode = this.dataset.mode;
      setupTheme(mode);
  }
})

function setupTheme(mode) {
  let pos = document.documentElement;

    if(mode == 'blue'){
      normalModeIcon.style.display = 'none';
      darkModeIcon.style.display = 'flex';
      pos.style.setProperty('--mainBg', '#00043c');
      pos.style.setProperty('--footer-bg', '#FAFAFF');
      pos.style.setProperty('--white', '#111111');
      pos.style.setProperty('--card-shadow', '#14274e');
      pos.style.setProperty('--grey', '#9ba4b4');
      pos.style.setProperty('--dark-grey', '#444444');
      pos.style.setProperty('--textarea-color', '#111111');
    }
    else if(mode == 'dark'){
      darkModeIcon.style.display = 'none';
      normalModeIcon.style.display = 'flex';
      pos.style.setProperty('--mainBg', '#000000');
      pos.style.setProperty('--footer-bg', '#111111');
      pos.style.setProperty('--white', '#dadee0');
      pos.style.setProperty('--card-shadow', '#222222');
      pos.style.setProperty('--grey', '#666666');
      pos.style.setProperty('--dark-grey', '#777777');
      pos.style.setProperty('--textarea-color', '#ffffff');
    }

    localStorage.setItem('theme', mode);
}
/*---==============END OF THEME SETUP======================---*/

/*=========DATABASE REFRENCE=================*/
const messageRef = firebase.database().ref('messages');

/*====================FORM SUBMISSION======================*/
contact__form.onsubmit = e => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const email__input = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  //CHECKING USER'S NETWORK
  const hasNetwork = online => {
    if(online){
      ValidateEmail(fullname, email__input, message);
    }
    else{
      alert_modal.style.display = 'block';
      dropDown.innerHTML = `
            <i class="far fa-times-circle"></i>
            <h4>No internet connection</h4>
      `
      setTimeout(()=> {
        dropDown.classList.add('slideUp');
      },3500);
      setTimeout(()=> {
        alert_modal.style.display = 'none';
        dropDown.classList.remove('slideUp');
      },4200);
    }
  };
  hasNetwork(navigator.onLine);
  
};

const saveMessage = (fullname, email__input, message) => {

  const dateNow = Date.now()
  const formatDate = new Date(dateNow).toLocaleString();

  messageRef.push({
    fullname,
    email: email__input,
    message,
    sentAt: formatDate
  });
};

/*================VALIDATING AN EMAIL FIELD==================*/
let  ValidateEmail = function(fullname, email__input, message) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  
    if(email__input.match(mailformat)) {

      saveMessage(fullname, email__input, message);
      contact__form.reset();
      alert_modal.style.display = 'block';
      dropDown.innerHTML = `
            <i class="far fa-check-circle"></i>
            <h4>message sent</h4>
      `
      setTimeout(()=> {
        dropDown.classList.add('slideUp');
      },3500);
      setTimeout(()=> {
        alert_modal.style.display = 'none';
        dropDown.classList.remove('slideUp');
      },4200);
  }
    else {
      alert("You have entered an invalid email address!");
      document.form1.email.focus();
  };
};

/*====================SMOOTH SCROLLING TO CONTACT FORM====================*/
const scrolling = () => {
  document.getElementById('contact').scrollIntoView({ 
    behavior: 'smooth' 
  });
};

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '50px',
  duration: 1500,
  reset: false
});

/*========SCROLL HOME & CONTACT===========*/
sr.reveal('.title',{}); 
sr.reveal('.brief',{delay: 150});
sr.reveal('.animate-scroll', {delay: 200});
sr.reveal('.animate-scroll',{ interval: 100});

/*========SCROLL ABOUT===========*/
sr.reveal('.title',{}); 
sr.reveal('.brief',{delay: 150});
sr.reveal('.small-header', {delay: 200});
sr.reveal('.tech',{delay: 400}); 
sr.reveal('.tech',{ interval: 100});