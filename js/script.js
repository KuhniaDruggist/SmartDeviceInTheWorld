'use strict';
var pageHeader = document.querySelector('.page-header');
var headerButton = pageHeader.querySelector('.page-header__button-callback');

var pageBody = document.querySelector('.page-body');

var popup = document.querySelector('.popup');
var popupButton = popup.querySelector('.popup__button');

var forms = document.querySelectorAll('form');
var inputsFirstName = document.querySelectorAll('[name=name]');
var inputsPhone = document.querySelectorAll('[name=phone]');
var inputsQuestion = document.querySelectorAll('[name=question]');

var isStorageSupport = true;
var storage = {
  name: '',
  phone: '',
  question: ''
};

try {
  storage.name = localStorage.getItem('firstName');
  storage.phone = localStorage.getItem('phone');
  storage.question = localStorage.getItem('question');
} catch (err) {
  isStorageSupport = false;
}

headerButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('popup--open');
  pageBody.classList.add('page-body__popup-open');

  if (storage.name) {
    inputsFirstName.forEach(function (item) {
      item.value = storage.name;
      return;
    });
    inputsPhone.forEach(function (item) {
      item.focus();
      return;
    });
  } else {
    inputsFirstName.forEach(function (item) {
      item.focus();
      return;
    });
  }
});

forms.forEach(function (item, i) {
  item.addEventListener('submit', function (evt) {
    if (isStorageSupport) {
      localStorage.setItem('firstName', inputsFirstName[i].value);
      localStorage.setItem('phone', inputsPhone[i].value);
      localStorage.setItem('question', inputsQuestion[i].value);
    }
    if (inputsPhone[i].value.length !== 17) {
      evt.preventDefault();
    }
  });
});

popupButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('popup--open');
  pageBody.classList.remove('page-body__popup-open');
});

window.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (popup.classList.contains('popup--open')) {
      popup.classList.remove('popup--open');
      pageBody.classList.remove('page-body__popup-open');
    }
  }
});

popup.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target && target.classList.contains('popup')) {
    popup.classList.remove('popup--open');
    pageBody.classList.remove('page-body__popup-open');
  }
});

var navigation = document.querySelector('.site-nav');
var navigationToggle = navigation.querySelector('.site-nav__button-toggle');
var contacts = document.querySelector('.contacts-footer');
var contactsToggle = contacts.querySelector('.contacts-footer__button-toggle');

navigation.classList.add('site-nav--close');
contacts.classList.add('contacts-footer--close');

navigationToggle.addEventListener('click', function () {
  if (navigation.classList.contains('site-nav--close')) {
    navigation.classList.remove('site-nav--close');
    navigation.classList.add('site-nav--open');
    if (!contacts.classList.contains('contacts-footer--close')) {
      contacts.classList.remove('contacts-footer--open');
      contacts.classList.add('contacts-footer--close');
    }
  } else {
    navigation.classList.remove('site-nav--open');
    navigation.classList.add('site-nav--close');
  }
});

contactsToggle.addEventListener('click', function () {
  if (contacts.classList.contains('contacts-footer--close')) {
    contacts.classList.remove('contacts-footer--close');
    contacts.classList.add('contacts-footer--open');
    if (!navigation.classList.contains('site-nav--close')) {
      navigation.classList.remove('site-nav--open');
      navigation.classList.add('site-nav--close');
    }
  } else {
    contacts.classList.remove('contacts-footer--open');
    contacts.classList.add('contacts-footer--close');
  }
});

inputsPhone.forEach(function (input) {
  input.addEventListener('keypress', function (evt) {
    if (evt.keyCode < 47 || evt.keyCode > 57) {
      evt.preventDefault();
    }
  });

  input.addEventListener('focus', function () {
    if (input.value.length === 0) {
      input.value = '+7(';
      input.selectionStart = input.value.length;
    }
  });

  input.addEventListener('click', function (evt) {
    if (input.selectionStart < 3) {
      input.selectionStart = input.value.length;
    }
    if (evt.key === 'Backspace' && input.value.length <= 3) {
      evt.preventDefault();
    }
  });

  input.addEventListener('blur', function () {
    if (input.value === '+7(') {
      input.value = '';
    }
  });

  input.addEventListener('keydown', function (evt) {
    if (evt.key === 'Backspace' && input.value.length <= 3) {
      evt.preventDefault();
    }
    var currentLength = input.value.length;

    if (evt.key === 'Backspace') {
      currentLength--;

      return;
    }

    if (currentLength === 6) {
      input.value = input.value + ') ';
    }
    if (currentLength === 11) {
      input.value = input.value + ' ';
    }
    if (currentLength === 14) {
      input.value = input.value + ' ';
    }
  });
});
