/*global $*/


$(document).ready(function () {
    readRecords(); 
});

function readRecords() {
    $.get("/produse/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
            + '<td class="nume">'+value.nume+'</td>'
			+ '<td class="descriere">'+value.descriere+'</td>'
			+ '<td class="producator">'+value.producator+'</td>'
			+ '<td class="pret">'+value.pret+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="bblock4">Refoloseste</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="bblock4">Sterge</button>'
			+ '</td>';
			
}

function addRecord() {
    $('#id').val('');
    $('#nume').val('');
    $('#descriere').val('');
    $('#producator').val('');
    $('#pret').val('');
    
    
    $('#myModalLabel').html('Add New Category');

}

function viewRecord(id) {
    var url = "/produse/" + id;
    
    $.get(url, {}, function (data, status) {
        $('#nume').val(data.nume);
                $('#descriere').val(data.descriere);
          $('#producator').val(data.producator);
        $('#pret').val(data.pret);
     
        $('#id').val(id);
    });
}

function saveRecord() {
    var formData = $('#record_form').serializeObject();
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }}

function createRecord(formData) {
    $.ajax({
        url: '/produse/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}
function updateRecord(formData) {
    $.ajax({
        url: '/produse/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.nume').html(formData.nume);
            $('#row_id_'+formData.id+'>td.descriere').html(formData.descriere);
            $('#row_id_'+formData.id+'>td.producator').html(formData.producator);
            $('#row_id_'+formData.id+'>td.pret').html(formData.pret);
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/produse/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}