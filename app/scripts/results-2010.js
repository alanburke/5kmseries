/*
 * init datatables
 */
$(document).ready(function(){
  var raceCols = [5,6,7,8,9,10];

  $('#results').dataTable({
    "sAjaxSource": '/data/results/2010.txt',
    "aaSorting": [[0,'asc']],
    //"bPaginate": false,
    "iDisplayLength": 25,
    //"bScrollInfinite": true,
    //"bScrollCollapse": true,
    //"sScrollY": "500px",

    "bLengthChange": false,
    "bAutoWidth": false,

    "bFilter": true,
    "bInfo": false
     /*
    "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
      if ( aData[5] == "" ) {
        $('td:eq(5)', nRow).html( '<b>-</b>' );
        $('tr', nRow).addClass('hidden');
        console.log(nRow);
        console.log(iDisplayIndex);
        $('#results tr:eq(2)').addClass('hidden');
        $('#results tr:eq(2)').remove();
            nRow.className = "disabled_row"


      }
    },
    */
  });

  $('.single-races .btn').click(function(){
    var gunCol = $(this).data('gun');

    for (var i = 5; i < 12; i++) {
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
