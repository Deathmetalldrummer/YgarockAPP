$('#saveImport').on('click',function (e) {
   var _import = $('#importTextArea').val();
    if (_import) {
      try {
         var _json = JSON.parse(_import);
         if (_json.green && _json.green.length && _json.red && _json.red.length){
            window.ygarock = _json;
            generateTable('green',ygarock['green']);
            generateTable('red',ygarock['red']);
             $('#exampleModal').modal('hide');
         } else {
            alert('Ошибка.Мне нужен крепкий...JSON Statham');
         }
      } catch (e) {
         alert('Ошибка.Мне нужен крепкий...JSON Statham');
         console.log(_import,e);
      }
   }

});
$('#exampleModal').on('hidden.bs.modal', function (e) {
    $('#importTextArea').val("");
});