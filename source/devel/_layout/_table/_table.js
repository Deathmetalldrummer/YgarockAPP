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
  console.log(tr);
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

