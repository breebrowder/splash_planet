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
})

function loadQuotes() {
  $('.single-item').append(quote1);
  $('.single-item').append(quote2);
  $('.single-item').slick();
}

// This is where the timer begins 
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
