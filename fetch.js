var produse = {
  rows: [],
  transport: null,
  pret: null
};
var tdTag = new RegExp(/<td[^>]*>([\s\S]*?)<\/td>/);
var aTag = new RegExp(/<a[^>]*>([\s\S]*?)<\/a>/);
var value = new RegExp(/<input(?:.*?)(?:.*)value=\"([^"]+).*>/i);
var parent = $('h4:contains("Informatii livrare:")').parent();

var tableRows = $('table#order-products tbody').map(function(){
  return $(this).find('tr').map(function(){
    return $(this).html();
  }).get();
}).get();


tableRows.forEach(function(e, i) {
  if (i === tableRows.length-1) { 
    produse.total = e.split(tdTag)[5]; 
  }
  if (i === tableRows.length-2) {
    produse.transport = e.split(tdTag)[7];
  }
  if (i < tableRows.length-2) {
    produse.rows.push({
      denumire: e.split(tdTag)[7].split(aTag)[1],
      buc: e.split(tdTag)[9].split(value)[1],
      pret: e.split(tdTag)[11].replace(' RON', '')
    });
  }
}, this);


chrome.runtime.sendMessage({
  nume: parent.find('label:contains("Nume")').next('input').val(),
  telefon: parent.find('label:contains("Nr. Telefon")').next('input').val(),
  adresa: parent.find('label:contains("Sediul")').next('input').val(),
  localitate: parent.find('label:contains("Localitate")').next('input').val(),
  judet: parent.find('label:contains("Judet")').next('input').val(),
  plata: $('label:contains("Mod plata")').next('input').val(),
  produse: produse,
}, null);
