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