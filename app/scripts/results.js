/*
 * init datatables
 */
$(document).ready(function(){
    var source = '/data/results/' + raceYear + '.txt';

    var resultsTable =  $('#results').dataTable({
    "sAjaxSource": source,
    "aaSorting": [[0,'asc']],
    "iDisplayLength": 25,
    "sScrollX": "100%",
    "bScrollCollapse": true,

    "bLengthChange": false,
    "bAutoWidth": false,

    "bFilter": true,
    "bInfo": false,
    "aoColumnDefs": [
      { "bVisible": false, "aTargets": chipCols }
     ],
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

  $('.btn.chip').click(function(){
    for (var i = 0; i < chipCols.length; i++) {
      fnShow(chipCols[i]);
    }
    for (var i = 0; i < raceCols.length; i++) {
      fnShow(raceCols[i]);
    }
    $('.btn-toolbar.results .btn').removeClass('active');
    $(this).toggleClass('active');
  });

  $('.single-races .btn').click(function(){
    var gunCol = $(this).data('gun');
    var chipCol = $(this).data('chip');

    for (var i = 5; i < 18; i++) {
      fnHide(i);
    }
    fnShow(gunCol);
    fnShow(chipCol);

    $('.btn-toolbar.results .btn').removeClass('active');
    $(this).toggleClass('active');
  });

  $('.btn.all').click(function(){
    $('.single-races .btn').removeClass('active');
    for (var i = 0; i < raceCols.length; i++) {
      fnShow(raceCols[i]);
    }
    for (var i = 0; i < chipCols.length; i++) {
      fnHide(chipCols[i]);
    }
    $(this).toggleClass('active');
  });
});

function fnShowHide(iCol) {
    /* Get the DataTables object again - this is not a recreation, just a get of the object */
    var oTable = $('#results').dataTable();

    var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
    oTable.fnSetColumnVis( iCol, bVis ? false : true );
}

function fnShow(iCol) {
    /* Get the DataTables object again - this is not a recreation, just a get of the object */
    var oTable = $('#results').dataTable();

    var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
    oTable.fnSetColumnVis( iCol, true );
}

function fnHide(iCol) {
    /* Get the DataTables object again - this is not a recreation, just a get of the object */
    var oTable = $('#results').dataTable();

    var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
    oTable.fnSetColumnVis( iCol, false);
}
