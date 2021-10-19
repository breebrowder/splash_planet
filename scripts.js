let responsiveCarousel = {
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
};

$(document).ready(function() {
    loadQuotes();
    loadPopularTutorials();
    loadLatestVideos();
    loadAllVideos('', 'all', 'most_popular');
    $('#searchSubmit').click(() => {
      loadAllVideos($('#keyword').val(), $('#topic').val(), $('#sortOption').val());
    })
})

function loadAllVideos(keyword, topic, sortOption) {
  $.ajax({
    url: `https://smileschool-api.hbtn.info/courses`,
    type: 'GET',
    q: keyword,
    topic: topic,
    sort: sortOption,
    dataType: 'json',
    jsonp: false,
    beforeSend: function () {
      $('.loader').show();
    },
    success: function(data) {
      let cardArray = [];
      $('#allVideos').empty();
      if (topic === 'all') {
          if (keyword === '') {
            cardArray = data.courses;   
          } else {
            data.courses.forEach(element => {
              element.keywords.forEach(item => {
                if (keyword.toLowerCase().includes(item.toLowerCase())) {
                  cardArray.push(element);
                }
              })
            })
          }
      } else {
          let topicCards = [];
          data.courses.forEach(course => {
            if (course.topic.toLowerCase() === topic) {
              topicCards.push(course);
            }
          })
          if (keyword === '') {
            cardArray = topicCards;   
          } else {
            topicCards.forEach(element => {
              element.keywords.forEach(item => {
                if (keyword.toLowerCase().includes(item.toLowerCase())) {
                  cardArray.push(element);
                }
              })
            })
          }
      }
      let finalArray = sortCards(cardArray, sortOption);
      $(`#videoCount`).text(`${finalArray.length} videos`);
      for (let i = 0; i < finalArray.length; i++) {
        populateVids(finalArray[i], "#allVideos", "allVid");
      }
    }
  })
}

function loadLatestVideos() {
  $.ajax({
    url: `https://smileschool-api.hbtn.info/latest-videos`,
    type: 'GET',
    dataType: 'json',
    jsonp: false,
    beforeSend: function () {
      $('.loader').show();
    },
    success: function(data) {
      $('#latestCarousel').empty();
      for (let i = 0; i < data.length; i++) {
        populateVids(data[i], "#latestCarousel", "latest");
      }
    },
    complete: function () {
      $('.loader').hide();
      $('#latestCarousel').slick(responsiveCarousel);
    }
  })
}

function loadPopularTutorials() {
  $.ajax({
    url: `https://smileschool-api.hbtn.info/popular-tutorials`,
    type: 'GET',
    dataType: 'json',
    jsonp: false,
    beforeSend: function () {
      $('.loader').show();
    },
    success: function(data) {
      $('#popCarousel').empty();
      for (let i = 0; i < data.length; i++) {
        populateVids(data[i], "#popCarousel", "pop");
      }
    },
    complete: function () {
      $('.loader').hide();
      $('#popCarousel').slick(responsiveCarousel);
    }
  })
}

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

function populateVids(card, outerDiv, innerDiv) {
  $(outerDiv).append(`<div id="${innerDiv}Card${card.id}" class="border-0 col-3 mx-3 pb-5">`);
  $(`#${innerDiv}Card${card.id}`).append(`<img src=${card.thumb_url} height="auto" width="255px" alt="Card image cap #1">
                                      <div class="p-2 pt-3">
                                          <h6 class="font-weight-bolder">${card.title}</h6>
                                          <p class="small text-muted">${card["sub-title"]}</p>
                                      </div>
                                      <div class="border-0">
                                          <div class="row m-0">
                                              <img class="rounded-circle" src=${card.author_pic_url} width="30px" height="30px" alt="Review pic">
                                              <p class="color-purp pl-3 pt-1">${card.author}</p>
                                          </div>
                                          <div class="row justify-content-between m-0">
                                              <div id="${innerDiv}StarReview${card.id}" class="row pl-2">
                                              </div>
                                              <p class="color-purp">${card.duration}</p>
                                          </div>
                                      </div>`);
        for (let j = 0; j < card.star; j++) {
          $(`#${innerDiv}StarReview${card.id}`).append('<img src="/images/star_on.png" height="15px" width="15px" alt="star on">');
        }
        for (let j = 0; j < (5 - card.star); j++) {
          $(`#${innerDiv}StarReview${card.id}`).append('<img src="/images/star_off.png" height="15px" width="15px" alt="star off">');
        }
}

function sortCards(cardArray, sortOption) {
  let finalArray = [];
  if (sortOption === 'most_popular') {
    let optionArray = cardArray.map(element => {
      return (element.star); 
    })
    optionArray.sort(function(a, b){return b-a});
    let optionSet = new Set(optionArray);
    [...optionSet].forEach(item => {
      cardArray.forEach(card => {
        if (card.star === item) {
          finalArray.push(card);
        }
      })
    })
  } else if (sortOption === 'most_viewed') {
      let optionArray = cardArray.map(element => {
        return (element.views);
      })
      optionArray.sort(function(a, b){return b-a});
      let optionSet = new Set(optionArray);
      [...optionSet].forEach(item => {
        cardArray.forEach(card => {
          if (card.views === item) {
            finalArray.push(card);
          }
        })
      })
  } else {
    let optionArray = cardArray.map(element => {
      return (element.published_at);
    })
    optionArray.sort(function(a, b){return b-a});
    let optionSet = new Set(optionArray);
    [...optionSet].forEach(item => {
      cardArray.forEach(card => {
        if (card.published_at === item) {
          finalArray.push(card);
        }
      })
    })
  }
  return (finalArray);
}
