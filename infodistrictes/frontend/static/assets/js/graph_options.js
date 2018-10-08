var div_to_img = '';
$(document).on("click", ".graph-options", function () {
    // Getters
    var jsonData = $(this).data('json');
    var optionTab = $(this).data('option');
    var title = $(this).data('title');
    var map = $(this).data('map');
    var csv_file = $(this).data('file');
    div_to_img = $(this).data('div');
    var domain = window.location.protocol+'//'+window.location.host;
    var share_url = domain + '/#' + div_to_img;
    var embed_url = '';

    // Reset
    $('#table').empty();
    $('#fulldata-tab').show();
    $('#saveImage-tab').show();

    // Conditionals
    if (jsonData == null) {
        $('#fulldata-tab').hide();
    }
    if (map != null){
        $('#saveImage-tab').hide();
        embed_url = '<iframe width="100%" height="100%" href="'+$('#'+div_to_img).attr("src")+'" frameborder="0"></iframe>';
    }
    else{
        embed_url = '<iframe width="100%" height="100%" href="'+domain+'/embed/'+$(this).data('embed')+'" frameborder="0"></iframe>';
    }

    // Logic
    $('#graph-title').text(title);
    $('[href="#'+optionTab+'"]').tab('show');
    $('#share-link').val(share_url);
    $('#embed-link').val(embed_url);

    if (typeof jsonData === 'string'){
        jsonData = JSON.parse(jsonData);
    }

    // Table Generation
    var dataTable = '';
    $.each(jsonData, function(index, value) {
        if(index < 1){
            dataTable += '<thead><tr>';
            for(var key in value){
                dataTable += '<th>' + key + '</th>';
            }
            dataTable += '</tr></thead><tbody>';
        }

        dataTable += '<tr>';
        for(var key2 in value){
            dataTable += '<td>' + value[key2] + '</td>';
        }
        dataTable += '</tr>';
    });
    $('#table').append(dataTable + '</tbody>');

    $('#csv-download').off('click').click(function(){
        if(csv_file != null){
            window.open(domain+csv_file);
        }else{
            csv_download(jsonData);
        }
    });
});

function csv_download(data) {
    var csvContent = "data:text/csv;charset=utf-8,";
    data = json_to_list(data);
    data.forEach(function(rowArray){
        var row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "info.csv");
    document.body.appendChild(link);

    link.click();
}

function json_to_list(data){
    var output = [];
    var i = 0;
    data.forEach(function(obj){
        if (i == 0){
            var headers = [];
            for(var key in obj){
                headers.push(key);
            }
            output.push(headers);
        }

        var values = [];
        for(var key2 in obj){
            values.push(obj[key2])
        }
        output.push(values);
        i++;
    });

    return output;
}

$('#export-image').click(function(){
    saveAsImage(div_to_img);
});

function saveAsImage(element_id) {
    const input = document.getElementById(element_id);

    html2canvas(input).then((canvas) => {
        var uri = canvas.toDataURL('image/png');

        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = 'image.png';

            //Firefox requires the link to be in the body
            document.body.appendChild(link);

            link.click();

            //remove the link when done
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    })
}

$('#copy-button').click(function(){
    copyToClipboard('#share-link');
    $('#copy-button').text('Copiat!');
    setTimeout(function(){
        $('#copy-button').text('Copia')
    }, 3000);
});

function copyToClipboard(element) {
    $(element).select();
    document.execCommand("copy");
}
