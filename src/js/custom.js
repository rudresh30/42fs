$(document).ready(function() {
  $('.selectpicker').selectpicker();
  var lttreadmore = $("a.lttreadmorebtn");
  lttreadmore.on("click", function() {
    var lttpara = $("#ltt-para");
    lttpara.slideToggle("fast");
    $(this).slideToggle("fast");
  });
  var lttreadless = $("a.lttreadlessbtn");
  lttreadless.on("click", function() {
    var lttpara = $("#ltt-para");
    lttpara.slideToggle("fast");
    lttreadmore.slideToggle("fast");
  });
  //mtt slider
  var mttreadmore = $("a.mttreadmorebtn");
  mttreadmore.on("click", function() {
    var mttpara = $("#mtt-para");
    mttpara.slideToggle("fast");
    $(this).slideToggle("fast");
  });
  var mttreadless = $("a.mttreadlessbtn");
  mttreadless.on("click", function() {
    var mttpara = $("#mtt-para");
    mttpara.slideToggle("fast");
    mttreadmore.slideToggle("fast");
  });
  //gtc slider
  var gtcreadmore = $("a.gtcreadmorebtn");
  gtcreadmore.on("click", function() {
    var gtcpara = $("#gtc-para");
    gtcpara.slideToggle("fast");
    $(this).slideToggle("fast");
  });
  var gtcreadless = $("a.gtcreadlessbtn");
  gtcreadless.on("click", function() {
    var gtcpara = $("#gtc-para");
    gtcpara.slideToggle("fast");
    gtcreadmore.slideToggle("fast");
  });
  $('#input-email').height($('#submit-button').height());
  $('#batch-select').height($('#submit-button').height());

  $("#submit-button").click(function() {
    $("html,body").animate({
        scrollTop: $(".course-content").offset().top
      },
      'slow');
  });
  //frontend content display
  $('#cfp-fe-btn').click(function(e) {
    e.preventDefault();
    $('#cfp-fe-content-id').slideToggle('fast');
    $('#cfp-fe-chevdown').toggleClass('fa-chevron-right');
    $('#cfp-fe-chevdown').toggleClass('fa-chevron-down');
    $("html,body").animate({
        scrollTop: $(".course-content").offset().top
      },
      'slow');
  });
  //backend content display
  let be_stat = 'close';
  $('#cfp-be-btn').click(function(e) {
    e.preventDefault();
    $('#cfp-be-content-id').slideToggle('fast');
    $('#cfp-be-chevdown').toggleClass('fa-chevron-right');
    $('#cfp-be-chevdown').toggleClass('fa-chevron-down');
    if (be_stat === 'close') {
      $("html,body").animate({
          scrollTop: $("#cfp-be-btn").offset().top
        },
        'slow');
      be_stat = 'open';
    } else {
      $("html,body").animate({
          scrollTop: $("#cfp-fe-btn").offset().top
        },
        'slow');
      be_stat = 'close';
    }

  });
  //softskills content display
  let sf_stat = 'close';
  $('#cfp-sf-btn').click(function(e) {
    e.preventDefault();
    $('#cfp-sf-content-id').slideToggle('fast');
    $('#cfp-sf-chevdown').toggleClass('fa-chevron-right');
    $('#cfp-sf-chevdown').toggleClass('fa-chevron-down');
    if (sf_stat === 'close') {
      $("html,body").animate({
          scrollTop: $("#cfp-sf-btn").offset().top
        },
        'slow');
      sf_stat = 'open';
    } else {
      $("html,body").animate({
          scrollTop: $("#cfp-be-btn").offset().top
        },
        'slow');
      sf_stat = 'close';
    }
  });

  //media queries using modernizr
  //on very small screens
  $(window).resize(function() {
    if (Modernizr.mq('(min-width: 320px)')) {
      $('#navbrand').html('42 Full Stack -xs');
      $('#launch-tag').html('Launch Price: <s>Rs 34650</s> <b>Rs 27450</b> ')
    }
  })
  //on small screens
  $(window).resize(function() {
    if (Modernizr.mq('(min-width: 544px)')) {
      $('#navbrand').html('42 Full Stack -mo');
    }
  })
  //on tablet size screens
  $(window).resize(function() {
    if (Modernizr.mq('(min-width: 768px)')) {
      $('#navbrand').html('42 Full Stack -tab');
    }
  })
  //on laptops small desktops

  $(window).resize(function() {
    if (Modernizr.mq('(min-width: 992px)')) {
      $('#navbrand').html('42 Full Stack - lap');
    }
  })
  //on large desktops

  $(window).resize(function() {
    if (Modernizr.mq('(min-width: 1200px)')) {
      $('#navbrand').html('42 Full Stack -desk');
    }
  }).resize(); // causes an initial resize to occur
});
