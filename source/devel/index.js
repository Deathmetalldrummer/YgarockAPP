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
  });
});
function storage() {
  localStorage.setItem('ygarock', JSON.stringify(ygarock));
}
