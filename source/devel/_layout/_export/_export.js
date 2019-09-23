$('.export').on('click',function (e) {
   $('#importTextArea2').val(JSON.stringify(window.ygarock));
   // $('#importTextArea2').val(localStorage.getItem('ygarock'))
});

$('#exampleModal2').on('hidden.bs.modal', function (e) {
   $('#importTextArea2').val("");
});