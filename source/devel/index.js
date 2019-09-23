//#include("./_layout/_mounting.js");
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
  }).fail(function () {
    var mockData = {"green":["Пусто"],"red":["Как в таблице моего рейтинга"]};
    _table(mockData)
  });
});
function storage() {
  localStorage.setItem('ygarock', JSON.stringify(ygarock));
}
