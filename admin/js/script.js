$(document).ready(function(){
    showProduse()
  
})

function showProduse() {
    $.get( "/produse", function( data ) {
        var html = ''
        data.forEach(function(produs) {
            html = html + '<li><a href="#" onClick="showProducts('+produs.id+')">'+produs.nume+'</a></li>'
        })
        $('#produse').html(html)
    });
}

