

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
  var text = tr.find('.text');
  var badge = tr.find('.badge');
  var div = $('<div></div>');

  for (var i = 0; i < arr.length; i++) {
    tr.find('td').append(text.text(arr[i]));
    tr.find('td').append(badge);
    div.append(tr.clone().attr('data-id',id+i));
  }

  storage();
  tbody.html(div.html());
  listenerTable();
}

function listenerTable() {
  $('.badge').on('click', function (e) {
    var target = $(e.target).closest('tr');
    var targetText = target.find('.text').text();
    var id = target.closest('.table').attr('id');
    var index = target.data('id');
    index = +index.replace(id, '');

    if (ygarock[id] && confirm('Точно удалить ' + targetText.trim() + '?')) {
      ygarock[id].splice(index,1);
      generateTable(id,ygarock[id]);
    }
  });
}


$('.export').on('click',function (e) {
   prompt("Используй Ctrl + C,а затем Enter или Ok",JSON.stringify(ygarock));
});
$('.import').on('click',function (e) {
   var _import = prompt("Используй Ctrl + V,а затем Enter или Ok");

   if (_import) {
      try {
         window.ygarock = JSON.parse(_import);
         generateTable('green',ygarock['green']);
         generateTable('red',ygarock['red']);
      } catch (e) {
         alert('Ошибка.Мне нужен крепкий...JSON Statham');
         console.log(_import,e);
      }
   }

});

$(function () {
  $.ajax({
    url: "data.json"
    // context: document.body
  }).done(function(data) {
    var _storage = localStorage.getItem('ygarock');
    if (_storage) {
      data = JSON.parse(_storage);
    }
    _table(data);
  });
});
function storage() {
  localStorage.setItem('ygarock', JSON.stringify(ygarock));
}
