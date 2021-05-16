'use strict';

var buttonOpen = document.querySelector('.header__order-button');
var modal = document.querySelector('.modal');
var buttonClose = modal.querySelector('.modal__close');
var page = document.querySelector('.page-body');
var nameModal = modal.querySelector('#modal-name');
var phoneModal = modal.querySelector('#modal-phone');
var messageModal = modal.querySelector('#modal-question');
var scrollLink = document.querySelector('.promo__scroll');
var promoLink = document.querySelector('.promo__link');
var accordion = document.querySelector('.accordion');
var phoneInput = document.querySelector('#phone');
var nameInput = document.querySelector('#name');
var messageInput = document.querySelector('#question');
var feedbackForm = document.querySelector('.feedback__form');
var modalForm = document.querySelector('.modal__form');
var isStorageSupport = true;
var nameStorage = '';
var phoneStorage = '';
var messageStorage = '';

try {
  nameStorage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

try {
  phoneStorage = localStorage.getItem('phone');
} catch (err) {
  isStorageSupport = false;
}

try {
  messageStorage = localStorage.getItem('message');
} catch (err) {
  isStorageSupport = false;
}

buttonOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  modal.classList.add('modal--open');
  page.classList.add('page-body--overlay');

  if (nameStorage && phoneStorage && messageStorage) {
    nameModal.value = nameStorage;
    phoneModal.value = phoneStorage;
    messageModal.value = messageStorage;
    nameModal.focus();
  } else {
    nameModal.focus();
  }

  modal.addEventListener('click', function (event) {
    if (!event.target.closest('.modal__content')) {
      closeModal();
    }
  });
});

function closeModal() {
  modal.classList.remove('modal--open');
  page.classList.remove('page-body--overlay');
}

buttonClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeModal();
});

if (page.classList.contains('page-body--overlay')) {
  page.addEventListener('click', closeModal());
}

modalForm.addEventListener('submit', function (evt) {
  if (!nameModal.value || !phoneModal.value || !messageModal.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameModal.value);
      localStorage.setItem('phone', phoneModal.value);
      localStorage.setItem('message', messageModal.value);
    }
  }
});


feedbackForm.addEventListener('submit', function (evt) {
  if (!nameInput.value || !phoneInput.value || !messageInput.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('phone', phoneInput.value);
      localStorage.setItem('message', messageInput.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (modal.classList.contains('modal--open')) {
      evt.preventDefault();
      closeModal();
    }
  }
});

// Плавный скролл

function scrollDown(evt) {
  evt.preventDefault();
  window.scrollTo({
    top: document.getElementById(evt.target.hash.replace('#', '')).offsetTop,
    behavior: 'smooth'
  });
}

document.addEventListener('DOMContentLoaded', function () {
  scrollLink.addEventListener('click', scrollDown);
  promoLink.addEventListener('click', scrollDown);
});

// Аккордеон

accordion.classList.remove('accordion--nojs');

document.querySelectorAll('.accordion__item button').forEach(function (item) {
  item.addEventListener('click', function () {
    var parent = item.closest('.accordion__item');
    if (parent.classList.contains('accordion__item--active')) {
      parent.classList.remove('accordion__item--active');
    } else {
      document.querySelectorAll('.accordion__item').forEach(function (child) {
        child.classList.remove('accordion__item--active');
      });
      parent.classList.add('accordion__item--active');
    }
  });
});

// Добавление значения +7 в поле для ввода телефона при фокусе

function addValue(element) {
  element.target.setAttribute('value', '+7(');
}

function removeValue(element) {
  element.target.setAttribute('value', '');
}

phoneInput.addEventListener('focus', addValue);
phoneInput.addEventListener('blur', removeValue);
phoneModal.addEventListener('focus', addValue);
phoneModal.addEventListener('blur', removeValue);

// Валидация номера телефона

function validatePhone(value) {
  if (value.target.validity.tooLong || value.target.validity.tooShort) {
    value.target.setCustomValidity('Введите номер телефона в формате +7(XXX)XXX-XX-XX');
  } else {
    value.target.setCustomValidity('');
  }
}

phoneInput.addEventListener('invalid', validatePhone);
phoneModal.addEventListener('invalid', validatePhone);