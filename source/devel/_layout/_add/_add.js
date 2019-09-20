$('.input-group .btn').on('click',function (e) {
  var parent = $(e.target).closest(".input-group");
  var input = parent.find('.form-control');
  var key = parent.attr('id').replace('add_','');

  ygarock[key].push($(input).val());
  $(input).val('');

  generateTable(key,ygarock[key]);
});

