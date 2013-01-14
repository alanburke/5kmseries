/*
 * init datatables
 */
$(document).ready(function(){
  var chipCols = [6,8,10,12,14,16];
  var raceCols = [5,7,9,11,13,15,17];

  $('#results').dataTable({
    "sAjaxSource": '/data/results/2012.txt',
    "aaSorting": [[0,'asc']],
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "aoColumnDefs": [
      { "bVisible": false, "aTargets": chipCols }
     ]
  });

  $('.btn.chip').click(function(){
    for (var i = 0; i < chipCols.length; i++) {
      fnShowHide(chipCols[i]);
    }
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
    $(this).toggleClass('active');
  });

  $('.btn.all').click(function(){
    for (var i = 0; i < raceCols.length; i++) {
      fnShow(raceCols[i]);
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
