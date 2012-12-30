/*
 * init datatables
 */
$(document).ready(function(){
  $('#results').dataTable({
    "aaSorting": [[0,'asc']],
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
  });
});
