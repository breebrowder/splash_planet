<<<<<<< Updated upstream
$(document).ready(function() {
    loadQuotes();
=======
const quote1 = `<div class="row align-items-center justify-content-center" id="quote1">
                  <div class="row justify-content-around">
                    <div class="col-sm-2">
                      <img class="rounded-circle mx-auto mt-3 mb-3 d-block" id="profile" src="images/splash_profile_guy.jpg" width="150" height="150" alt="slide">
                    </div>
                    <div class="col-sm-6 ml-3 mr-3 float-left text-white" id="testimonial1">
                      <p>"I bring my family here every year. Splash Planet is always exactly what we need during the hot
                          summer months. And the time spent with family is unbeatable."</p>
                      <p><span class="text-white font-weight-bold" id="name">John Smith</span><br>
                        <span class="text-white font-italic" id="weatherman">2017</span>
                      </p>
                    </div>
                  </div>
                </div>`;

const quote2 = `<div class="row align-items-center justify-content-center" id="quote2">
                  <div class="row justify-content-around">
                    <div class="col-sm-2">
                      <img class="rounded-circle mx-auto mt-3 mb-3 d-block" id="profile1" src="images/splash_profile_girl.jpg"
                        width="150" height="150" alt="slide">
                    </div>
                    <div class="col-sm-6 ml-3 mr-3 float-left text-white" id="testimonial2">
                      <p class="pt-3">"The hotel is to die for. Indoor jacuzzis, unlimited drinks, and room service 24/7."</p>
                      <p><span class="text-white font-weight-bold" id="name1">Samantha Lane</span><br>
                        <span class="text-white font-italic" id="weatherman1">2020</span>
                      </p>
                    </div>
                  </div>
                </div>`;

$(document).ready(function () {
  loadQuotes();
  var fiveMinutes = 60 * 5,
  display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
  $("#myBtn").click(function(){
    $("#myModal").modal();
  });
  $('#bookIt').click(() => {
    sessionStorage.setItem($('#custName').val(), $('#bookItDate').val());
  })
>>>>>>> Stashed changes
})

function loadQuotes() {
  $.ajax({
    url: `https://smileschool-api.hbtn.info/quotes`,
    type: 'GET',
    dataType: 'json',
    jsonp: false,
    beforeSend: function () {
      $('.loader').show();
    },
    success: function(data) {
      $('.single-item').empty();
      for (let i = 0; i < data.length; i++) {
        $('.single-item').append(`<div id="quotes${data[i].id}" class="col-8 mx-auto">`);
        $(`#quotes${data[i].id}`).append(`<div id="quotesCard${data[i].id}" class="text-white d-sm-flex flex-sm-row">`);
        $(`#quotesCard${data[i].id}`).append(`<img src="${data[i].pic_url}" class="d-block rounded-circle mt-110 mx-auto ml-sm-5 mx-sm-none" width="150px" height="150px" alt="Profile Pic #5">
                                      <div class="mb-110 mt-110 px-5 cara-cust">
                                        <p>« ${data[i].text}</p>
                                        <h5>${data[i].name}</h5>
                                        <p class="font-italic">${data[i].title}</p>
                                      </div>`);
      }
    },
    complete: function() {
      $('.loader').hide();
      $('.single-item').slick();
    }
  })
}
