/* global $:readonly */
'use strict';

var buttonOpen = document.querySelector('.header__order-button');
var modal = document.querySelector('.modal');
var buttonClose = document.querySelector('.modal__close');
var page = document.querySelector('.page-body');
var nameModal = document.querySelector('#modal-name');
var phoneModal = document.querySelector('#modal-phone');
var messageModal = document.querySelector('#modal-question');
var scrollLink = document.querySelector('.promo__scroll');
var promoLink = document.querySelector('.promo__link');
var accordion = document.querySelector('.accordion');
var phoneInput = document.querySelector('#phone');
var nameInput = document.querySelector('#name');
var messageInput = document.querySelector('#question');
var feedbackForm = document.querySelector('.feedback__form');
var popupForm = document.querySelector('.popup__form');
var modalForm = document.querySelector('.modal__form');
var accordionHeaders = document.querySelectorAll('.accordion__item h2');
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

if (buttonOpen) {
  buttonOpen.classList.remove('header__order-button--no-js');
  buttonOpen.addEventListener('click', function (evt) {
    if (!buttonOpen.classList.contains('header__order-button--no-js')) {
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
    }
  });
}

function closeModal() {
  modal.classList.remove('modal--open');
  page.classList.remove('page-body--overlay');
}

if (buttonClose) {
  buttonClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeModal();
  });
}

if (page.classList.contains('page-body--overlay')) {
  page.addEventListener('click', closeModal());
}

// Валидация номера телефона

function validatePhone(value) {
  if (value.target.validity.tooLong || value.target.validity.tooShort) {
    value.target.setCustomValidity('Введите номер телефона в формате +7(XXX)XXX-XX-XX');
  } else {
    value.target.setCustomValidity('');
  }
}

if (phoneInput) {
  phoneInput.addEventListener('invalid', validatePhone);
}

if (phoneModal) {
  phoneModal.addEventListener('invalid', validatePhone);
}

// localStorage

if (modalForm) {
  modalForm.addEventListener('submit', function (evt) {
    if (!nameModal.value || !phoneModal.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', nameModal.value);
        localStorage.setItem('phone', phoneModal.value);
        localStorage.setItem('message', messageModal.value);
      }
    }
  });
}

if (feedbackForm) {
  feedbackForm.addEventListener('submit', function (evt) {
    if (!nameInput.value || !phoneInput.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', nameInput.value);
        localStorage.setItem('phone', phoneInput.value);
        localStorage.setItem('message', messageInput.value);
      }
    }
  });
}

if (popupForm) {
  popupForm.addEventListener('submit', function (evt) {
    if (!nameModal.value || !phoneModal.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', nameModal.value);
        localStorage.setItem('phone', phoneModal.value);
        localStorage.setItem('message', messageModal.value);
      }
    }
  });
}

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

if (scrollLink && promoLink) {
  document.addEventListener('DOMContentLoaded', function () {
    scrollLink.addEventListener('click', scrollDown);
    promoLink.addEventListener('click', scrollDown);
  });
}

// Аккордеон

accordion.classList.remove('accordion--nojs');

if (accordion) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    accordionHeaders.forEach(function (element) {
      var accordionToggle = document.createElement('button');
      accordionToggle.textContent = element.textContent;
      accordionToggle.setAttribute('type', 'button');
      accordionToggle.setAttribute('tabindex', '2');
      element.innerHTML = '';
      element.appendChild(accordionToggle);
    });
  }

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
}

// Добавление значения +7 в поле для ввода телефона при фокусе

function addValue(element) {
  element.target.setAttribute('value', '+7(');
}

function removeValue(element) {
  element.target.setAttribute('value', '');
}

if (phoneInput) {
  phoneInput.addEventListener('focus', addValue);
  phoneInput.addEventListener('blur', removeValue);
}

if (phoneModal) {
  phoneModal.addEventListener('focus', addValue);
  phoneModal.addEventListener('blur', removeValue);
}

// Маска

$(document).ready(function () {
  $('#phone').mask('+7(000)000-00-00');
  $('#modal-phone').mask('+7(000)000-00-00');
});
