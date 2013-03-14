/*
 * init datatables
 */
$(document).ready(function(){
  var raceCols = [3,4,5,6,7,8];

  $('#results').dataTable({
    "sAjaxSource": '/data/results/2009.txt',
    "aaSorting": [[1,'asc']],
    "iDisplayLength": 25,
    "bLengthChange": false,
    "bAutoWidth": false,
    "bFilter": true,
    "bInfo": false
  });

  $('.single-races .btn').click(function(){
    var gunCol = $(this).data('gun');

    for (var i = 2; i < 9; i++) {
      fnHide(i);
    }
    fnShow(gunCol);

    $('.btn-toolbar.results .btn').removeClass('active');
    $(this).toggleClass('active');
  });

  $('.btn.all').click(function(){
    $('.single-races .btn').removeClass('active');
    for (var i = 0; i < raceCols.length; i++) {
      fnShow(raceCols[i]);
    }
    $(this).toggleClass('active');
  });

});
