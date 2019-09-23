$(function () {
  var greenAction = null;
  var redAction = null;

  $('#search').on('submit',function (e) {
  e.preventDefault();
  var target = e.target;
  var input = $(target).find('.form-control');
  _action(input);
});
$('#search .form-control').on('keyup',function (e) {
  var target = $(e.target);
  _action(target);
});

function _action(input) {
  "use strict";
  var green = ygarock.green.filter(function (item){
    return input.val() === item;
  });
  var red = ygarock.red.filter(function (item){
    return input.val() === item;
  });

  if (greenAction) {
    greenAction = false;
    generateTable('green',ygarock.green);
  }
  if (redAction) {
    redAction = false;
    generateTable('red',ygarock.red);
  }

  if (green.length) {
    greenAction = true;
    generateSearch("green",green);
  }
  if (red.length) {
    redAction = true;
    generateSearch("red",red);
  }
}


function generateSearch(id, key) {
  var tbody = $('#'+id+' tbody');
  var tr = tbody.find('tr').first().clone();
  var text = tr.find('.text');
  var badge = tr.find('.badge');
  var div = $('<div></div>');


  for (var i = 0,index = -1; i < key.length; i++) {
    index = ygarock[id].indexOf(key[i], index + 1);
    tr.find('td').append(text.text(ygarock[id][index]));
    tr.find('td').append(badge);
    div.append(tr.clone().attr('data-id',id+index));
  }
  tbody.html(div.html());

  listenerTable();
}
});
