/* $(document).ready(function () {
  loadQuotes();
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
    success: function (data) {
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
    complete: function () {
      $('.loader').hide();
      $('.single-item').slick();
    }
  })
} */

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

window.onload = function () {
  var fiveMinutes = 60 * 5,
    display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
};
