

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

$('.input-group .btn').on('click',function (e) {
  var parent = $(e.target).closest(".input-group");
  var input = parent.find('.form-control');
  var key = parent.attr('id').replace('add_','');

  ygarock[key].push($(input).val());
  $(input).val('');

  generateTable(key,ygarock[key]);
});


function _table(data) {
  window.ygarock = data;
  for (var key in data) {
    generateTable(key, data[key]);
  }
  listenerTable();
}

function generateTable(id,arr) {
  var tbody = $('#'+id+' tbody');
  var tr = tbody.find('tr').first().clone();
  var badge = tr.find('.badge');
  var div = $('<div></div>');

  for (var i = 0; i < arr.length; i++) {
    tr.find('td').text(arr[i]).append(badge);
    div.append(tr.clone().attr('data-id',id+i));
  }

  tbody.html(div.html());
  listenerTable();
}

function listenerTable() {
  $('.badge').on('click', function (e) {
    var target = $(e.target).closest('tr');
    var id = target.closest('.table').attr('id');
    var index = target.data('id');
    index = +index.replace(id, '');

    if (ygarock[id]) {

      ygarock[id].splice(index,1);
      generateTable(id,ygarock[id]);
    }
  });
}



$(function () {
  $.ajax({
    url: "data.json"
    // context: document.body
  }).done(function(data) {
    _table(data);
  });


$('.navbar-brand').on('click',function (e) {
  copyToClipboard(JSON.stringify(ygarock))
});
  function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }
});
