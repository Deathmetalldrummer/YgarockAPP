//#include("./_layout/_mounting.js");
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
