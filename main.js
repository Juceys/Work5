// Intersection Observer API
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav__link').forEach((link) => {
                let id = link.getAttribute('href').replace('#', '');
                let navItem = link.parentElement;
                if (id === entry.target.id) {
                    navItem.classList.add('nav__item--active');
                } else {
                    navItem.classList.remove('nav__item--active');
                }
            })
        }
    })
}, {
    threshold: 0.5
})

document.querySelectorAll('section').forEach(section => {
    observer.observe(section)
})



// Popup
let comments = [];
loadComments();

document.getElementById('btn-create').addEventListener('click', ClosePopup);
document.querySelector('.popup__close').addEventListener('click', ClosePopup);
document.querySelector('.undo').addEventListener('click', ClosePopup);


// FUCNTIONS
function ClosePopup() {
    document.querySelector('.popup').classList.toggle('popup--active');
};

function addComments() {

    let commentPattern = document.getElementById('pattern');
    let commentDomen = document.getElementById('domen');

    let comment = {
        pattern: commentPattern.value,
        domen: commentDomen.value,
        id: Date.now()
    }

    comments.unshift(comment);
    ClosePopup();
    showComments();
    saveComments();
    addEvenListeners();

    commentDomen.value = '';
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
    addEvenListeners();
}


function showComments() {

    let commentField = document.getElementById('comment-field');
    let out = '';

    comments.forEach(function (item, index) {
        out += `
    <div class='comment'>
          <p class='table__number'> ${index + 1} </p> 
          <p class='table__name'>${item.pattern}</p>
            <p class='table__address link__pp'>http://www.${item.domen}.work5.ru/</p>
        <div class='buttons table__action'>
            <button type='button' class='btn btn__pencil' id='${item.id}'>
            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use xlink:href="./img/svg/pencil.svg#pencil"></use>
            </svg>
            Редактировать
            </button>
            <button type='button' class="btn btn__cancel" id='${item.id}'>
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use xlink:href="./img/svg/cancel.svg#cancel"></use>
            </svg>
            Удалить
            </button>
        </div>
    </div>
    `;
    });
    commentField.innerHTML = out;
}

function removeComment(e) {

    //remove from comments list
    let index = comments.findIndex(item => item.id === +(e.currentTarget.id));
    comments.splice(index, 1);

    //remove from DOM
    const currentButton = e.currentTarget;
    currentButton.closest('.comment').remove();

    //remove from localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    loadComments();
}

function addEvenListeners() {
    const buttonsDelete = document.querySelectorAll('.btn__cancel');
    buttonsDelete.forEach(button => {
        button.addEventListener('click', removeComment)
    });
}
