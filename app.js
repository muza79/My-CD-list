$(document).ready(function(){

var cd = $(".cd");
var titles = cd.children();
var modal = $(".modal");
var contents = $(".contents");
var modalContent = $(".modal-content");
var note = $(".note");


//------------------------------------------ intro

titles.hide();

var interval = setInterval(function () {
  cd.eq(Math.round(Math.random()*cd.length-1)).animate({
    width: "100%"
  },200);

}, 20);

setTimeout(function () {
  clearInterval(interval);
  cd.css("width", "100%");//just to be on the safe side
  titles.slideDown(700);
}, 4000);
// intro


//------------------------------------------ cd colors

// var colorList =  ['#2e2e1f', '#000d33', '#003311', '#4d0000', '#33001a', '#1f004d', '#034945', '#331a00', '#444422', '#1a6600', '#069389', '#663300', '#00264d', '#660000', '#02312e', '#333300', '#004466', '#666600', '#19194d', '#293d3d'];

cd.each(function () {
  // $(this).css('backgroundColor', colorList[Math.round(Math.random()*19)]);

if (($(this).index()) % 2 == 0) {
  $(this).css('backgroundColor', '#FFF').css('color', '#000');
} else {
  $(this).css('backgroundColor', '#000').css('color', '#FFF');
}


}); //cd colors



//--------------------------------- cd onClick

cd.on("click", function () {

  var cdIndex = $(this).index();

  if ($(this).data("albumid")==null) {
      $(this).css("color", "red")
  } else {


var albumId = $(this).data("albumid");

var albumUrl = 'http://api.musicgraph.com/api/v2/album/';

modal.css("display", "block");

$.ajax({
  url: albumUrl + albumId,
  data: {
    api_key: '595c8eb0a215b65f5351293676146fb7'
  }
}).done(function(response) {

      // console.log(response.data);

    var artist = $('<p>Artist: '+ response.data.artist_name +'</p>');
    var title = $('<p>Title: '+ response.data.title +'</p>');
    var release = $('<p>Release year: '+ response.data.release_year +'</p>');
    var form = $('<p>Product form: '+ response.data.product_form +'</p>');
    var tracks = $('<p>Number of tracks: '+ response.data.number_of_tracks +'</p>');
    var genre = $('<p>Genre: '+ response.data.main_genre +'</p>');
    var num = $('<p>CD number: '+ (cdIndex + 1) +'</p>');

    var button = $('<button>Tracks</button>');

    contents.append(artist).append(title).append(release).append(form).append(tracks).append(genre).append(button).append(num);




//--------------------------------- button onClick
  button.on("click", function () {


    var tracks = $("<div class='tracks'>Track list:</div>");
    contents.after(tracks);

    $.ajax({
      url: albumUrl + albumId + "/tracks",
      data: {
        api_key: '595c8eb0a215b65f5351293676146fb7'
      }
    }).done(function(response) {

          // console.log(response.data);
          var ul = $('<ul></ul>');

          if (response.data.length == 0) {

            tracks.text("Couldn't find the track list")
          }


          response.data.forEach(function(e) {

            // console.log(e.title);
            var li = $('<li>').text(e.title);
            if (e.track_index != undefined) {

              li.append('<span>, index: ' + e.track_index + '</span>');
            }

          ul.append(li);
          tracks.append(ul);

        });
      // }

        }); //done


  });//button onClick

  $(".close").on("click", function () {
    modal.fadeOut();
    contents.find("p").remove();
    contents.find("button").remove();
    modalContent.find(".tracks").remove();
  });


    }); //done

      }
}); //cd onClick

//---------------------------------------- note onClick

note.on("click", function () {
    $(this).remove();
});



});//FINITO
