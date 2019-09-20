function _table(data) {
  window.ygarock = data;
  for (var key in data) {
    generateTable(key, data[key]);
  }
  listenerTable(ygarock);
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
}

function listenerTable(ygarock) {
  $('.badge').on('click', function (e) {
    var target = $(e.target).closest('tr');
    var id = target.closest('.table').attr('id');
    var index = target.data('id');
    index = +index.replace(id, '');
    if (ygarock[id]) {
      ygarock[id].splice(index,1);
      generateTable(id,ygarock[id]);
      listenerTable(ygarock);
    }
  });
}

