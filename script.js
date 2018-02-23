document.addEventListener('DOMContentLoaded', function () {
  var fetchButton = document.querySelector('#fetch'),
    generateButton = document.querySelector('#generate'),
    nume = '',
    adresa = '',
    telefon = '',
    oras = '',
    judet = '',
    data = '',
    plata = '',
    produse = null;
  fetchButton.addEventListener('click', fetch);
  generateButton.addEventListener('click', gen);
});

function gen(e){
  e.preventDefault();
  generate({
    nume: document.querySelector('#nume').value,
    adresa: document.querySelector('#adresa').value,
    telefon: document.querySelector('#telefon').value,
    localitate: document.querySelector('#localitate').value,
    judet: document.querySelector('#judet').value,
    data: document.querySelector('#data').value,
    nrfactura: document.querySelector('#nrfactura').value || '',
    plata: plata,
    produse: produse,
  });
}

function fetch(e) {
  e.preventDefault();
  chrome.tabs.executeScript(null, {file: 'jQuery.js'});
  chrome.tabs.executeScript(null, {file: 'fetch.js'});
}

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    nume = document.querySelector('#nume').value = message.nume;
    adresa = document.querySelector('#adresa').value = message.adresa;
    telefon = document.querySelector('#telefon').value = message.telefon;
    localitate = document.querySelector('#localitate').value = message.localitate;
    judet = document.querySelector('#judet').value = message.judet;
    plata = document.querySelector('#plata').value = message.plata;
    data = document.querySelector('#data').value = getCurrentDate();
    produse = message.produse;
  }
);

function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  return dd+'.'+mm+'.'+yyyy;
}
