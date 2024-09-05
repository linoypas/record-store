
const addedSongs = ['שירים שהתווספו:'];

$("#addSongBtn").on( "click", function(event) {
    addSong(event);
  });

function addSong(event) {
  event.preventDefault();
  const song = document.getElementById('addSongs');
  const songName = song.value;
  song.value = '';
  if(songName.trim().length){
    addedSongs.push(songName);
    $('#songs').html(addedSongs.join('<br>'));
    $('#trackList').val(addedSongs.slice(1));
  }
}

$('#addSongBtn').on('click', function() {
    $("#form-container").valid();
});

$(document).ready(function(){
    $.validator.addMethod(
        "listOfSongsNotEmpty", 
        function() {
            if(addedSongs.length <= 1)
                return false;
            return true;
        },
        "Track list cannot be empty"
    );
});


$(document).ready(function(){
    $("#submit").click(function () {
          $('#form-container').validate({ 
            ignore: '',
            rules: {
                name:{
                    required: true
                },
                price: {
                    required: true,
                    number: true
                },
                artist:{
                    required: true
                },
                year:{
                    number: true,
                    min: 1860,
                    required: true
                },
                trackList: {
                    listOfSongsNotEmpty: true,
                },
                image: {
                    required: true
                }
            },
            messages: {
                name:{
                    required: "Name is required"  
                },
                price: {
                    required: "Price is required",
                    number: "Price should be a number"
                },
                artist:{
                    required: "Artist is required"
                },
                year:{
                    number: "Year should be a number",
                    min: "Year should be greater than 1860",
                    required: "Year is required"
                },
                trackList: {
                    listOfSongsNotEmpty: "Track list cannot be empty"
                },
                image: {
                    required: "Image is required"
                }
            },
            submitHandler: function(a, e) {
                e.preventDefault();
                const formData = $("#form-container").serialize();
                const URL = $("#form-container").attr("action");
                $.ajax({
                  url: URL,
                  type: "POST",
                  data: formData,
                //   processData: false,
                })
                .done(function(data, textStatus, jqXHR) {
                    alert(data);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                })
                .always(function(data, textStatus, jqXHR) {
                    $('#form-container').each(function(){
                        this.reset();
                    });
                    addedSongs = [];
                })
            }
        });
   });
}); 