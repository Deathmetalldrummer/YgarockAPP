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
    console.log(green[0]);
    generateSearch("green",green[0]);
  }
  if (red.length) {
    redAction = true;
    console.log(red[0]);
    generateSearch("red",red[0]);
  }
}


function generateSearch(id, key) {
  var tbody = $('#'+id+' tbody');
  var tr = tbody.find('tr').first().clone();
  var badge = tr.find('.badge');
  var div = $('<div></div>');

  var i = ygarock[id].indexOf(key);

  tr.find('td').text(ygarock[id][i]).append(badge);
  div.append(tr.clone().attr('data-id',id+i));
  tbody.html(div.html());

  listenerTable();
}
});
