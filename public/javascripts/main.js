// @hts-check

// $(document).ready(function(){
//   $('#nav-icon4').click(function(){
//     $(this).toggleClass('open');
//   });
// });

(function () {
  var tab = $("#tab")[0];
  window.onscroll = function () {
    if (window.scrollY > 404) {
      $("#tab").css('position', 'fixed');
      $("#tab").css('width','100vw');
      $("#tab").css('top',"60px");
    } else {
      $("#tab").css('position', 'static');
    }
  }
}());

(function () {
  var obj = {
    name: 'lokendra',
    game: 'call of duty',
    func: function () {
      return this.name + this.game;
    }
  }
  var loki = function (a) {
    var choki = function () {
      return a;
    }
  }
  loki('some key');
  obj.func();
})();

function getData() {
  $("#loader").css('display', 'inline-block');
  var jqxhr = $.get("/", function (data) {
      console.log('success');
    })
    .done(function (data) {
      console.log(data);
      setTimeout(_ => {
        $("#loader").css("display", "none");
        var buffer = "";
        data.forEach(x => {
          buffer += '<div class="col-12 col-sm-6 col-lg-3 col-xl-3 outer-box"><div class="box border border-left-0 border-top-0 border-right-0"><div class="image text-center"><img onerror="this.src="images/supreme1.jpg"" data-original="' + x.smallImageUrl + '" src="'+ x.smallImageUrl +'"></div><br/><p class="dealname"><a href="#">'+ x.dealName + '</a></p><div class="box-text"><div class="text-center"><div class="cut-price text-left"><div class="clearfix row"><div class="col-7 pr-0 lead"><del class="mr-1"><small>'+ x.cutPrice +'</small></del>'+ x.mainPrice +'</div><div class="col-5 pl-0 text-right"><a href="/{{this.storeName}}">'+ x.storeName +'</a></div></div><br/></div><a class="btn btn-sm btn-shop" style="border-radius: 2em;" href="{{this.dealUrl}}">Shop Now</a><br/><br/></div></div></div></div>';
        });
        $("#content-box").append(buffer);
      }, 500);
    })
    .fail(function (err) {
      $("#loader").css("display", "none");
      console.log(err);
    })
    .always(function () {});
}

//CODE FOR THE SEARCH RESULTS XHR
var showResults = debounce(function (arg) {
  var value = arg.trim();
  if (value == "" || value.length <= 1) {
    $("#search-results").fadeOut();
    return;
  } else {  
    $("#loader").css('display', 'inline-block');
    $("#search-results").fadeIn();
  };
  var jqxhr = $.get('/xhr/search?q=' + value, function (data) {
      $("#search-results").html("");
    })
    .done(function (data) {
      $("#loader").css("display", "none");
      if (data.length === 0) {
        $("#search-results").append('<h2 style="letter-spacing:10px;font-weight:300" class="m-0 text-center">NO RESULTS</h2>');
      } else {
        console.log(data);
        $("#search-results").append('<h2 style="letter-spacing:10px;font-weight:300" class="text-center pb-4">STORES</h2>');
        data.forEach(x => {
          $("#search-results").append('<div class="p-2 col-sm-4 text-center"><h1 class="d-inline text-left m-3"><a style="color:#000" href="#">'+x.storeName+'</a></h1></div>');
        });
      }
    })
    .fail(function (err) {
      console.log(err);
    })
}, 100);


function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// var target = document.getElementById('search');
// var player = target.animate([
//   {transform: 'translateX(320px)'},
//   {transform: 'translateX(0px)'}
// ], 300);
// player.addEventListener('finish', function() {
//   target.style.transform = 'translateX(0px)';
// });


// function search(){
//   // $('#search').show();
//   // $('body').addClass('freeze');
//   player.play();
// }

var container = document.querySelector('.containerr');
var backButton = document.querySelector('.close');
var listItems = document.querySelector('.open');

/**
 * Toggles the class on the container so that
 * we choose the correct view.
 */
function onViewChange(evt) {
  container.classList.toggle('view-change');
}

// When you click a list item, bring on the details view.
// for (var i = 0; i < listItems.length; i++) {
//   listItems[i].addEventListener('click', onViewChange, false);
// }

listItems.addEventListener('click', onViewChange, false);

// And switch it back again when you click the back button
backButton.addEventListener('click', onViewChange);