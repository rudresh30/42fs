$(document).ready(function () {
  $('.selectpicker').selectpicker();
  var lttreadmore = $("a.lttreadmorebtn");
  lttreadmore.on("click", function () {
    var lttpara = $("#ltt-para");
    lttpara.slideToggle("fast");
    $(this).slideToggle("fast");
  });
  var lttreadless = $("a.lttreadlessbtn");
  lttreadless.on("click", function () {
    var lttpara = $("#ltt-para");
    lttpara.slideToggle("fast");
    lttreadmore.slideToggle("fast");
  });
  //mtt slider
  var mttreadmore = $("a.mttreadmorebtn");
  mttreadmore.on("click", function () {
    var mttpara = $("#mtt-para");
    mttpara.slideToggle("fast");
    $(this).slideToggle("fast");
  });
  var mttreadless = $("a.mttreadlessbtn");
  mttreadless.on("click", function () {
    var mttpara = $("#mtt-para");
    mttpara.slideToggle("fast");
    mttreadmore.slideToggle("fast");
  });
  //gtc slider
  var gtcreadmore = $("a.gtcreadmorebtn");
  gtcreadmore.on("click", function () {
    var gtcpara = $("#gtc-para");
    gtcpara.slideToggle("fast");
    $(this).slideToggle("fast");
  });
  var gtcreadless = $("a.gtcreadlessbtn");
  gtcreadless.on("click", function () {
    var gtcpara = $("#gtc-para");
    gtcpara.slideToggle("fast");
    gtcreadmore.slideToggle("fast");
  });

  $("#submit-button").click(function () {
    $("html,body").animate({
      scrollTop: $(".course-content").offset().top
    },
      'slow');
  });
  //frontend content display
  $('#cfp-fe-btn').click(function (e) {
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
  $('#cfp-be-btn').click(function (e) {
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
  $('#cfp-sf-btn').click(function (e) {
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

  //validate form

  //set defaults
  $.validator.setDefaults({
    errorClass: 'error-msg',
    highlight: function (element) {
      $(element)
        .closest('.form-element')
        .addClass('form-error');
    },
    unhighlight: function (element) {
      $(element)
        .closest('.form-element')
        .removeClass('form-error');
    }
  });

  //hide modal by default

  $('#alertModal').modal({
    show: false
  });


  //validate contact-us form

  $('#contactForm').validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
        maxlength: 30,
        lettersonly: true
      },
      email: {
        required: true,
        email: true
      },
      contactno: {
        required: false,
        minlength: 8,
        maxlength: 18,
        digits: true
      },
      batch: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Name must have at least 2 characters",
        maxlength: "Name cannot be longer than 30 characters",
        lettersonly: "Please enter valid letters only"
      },
      email: {
        required: "Please provide email address",
        email: "Please provide a valid email address"
      },
      contactno: {
        minlength: "Phone number should have at least 8 digits - please provide STD code including '0' for landline",
        maxlength: "Phone number should have maximum 18 digits - please provide STD code including '0' for landline",
        digits: "phone number should only contain digits"
      },
      batch: {
        required: "Please select a batch"
      }
    },

    submitHandler: function (form) {
      var batchId = $('select option:selected').val();
      var name = $('#input-name').val();
      var email = $('#input-email').val();
      var contactno = $('#input-phone').val();

      var formData = {
        name: name,
        email: email,
        contactno: contactno,
        batch: Number(batchId)
      }

      function postData() {
        return $.ajax({
          url: '/submit',
          data: formData,
          dataType: 'json',
          type: 'POST'
        });
      };

      postData().done(function (data) {
        $('#alert-msg').text(data.result);
        $('#alertModal').modal('show');
        $('#input-name').val('');
        $('#input-email').val('');
        $('#input-phone').val('');
      });

    }

  });






  //submit form data to server
  /*
    $('#cfp-submit-form').on('click', function (e) {
      e.preventDefault();
  
  
      var batchId = $('select option:selected').val();
      var name = $('#input-name').val();
      var email = $('#input-email').val();
      var contactno = $('#input-phone').val();
  
      console.log(batchId);
  
      var formData = {
        name: name,
        email: email,
        contactno: contactno,
        batch: Number(batchId)
      }
  
      function postData() {
        return $.ajax({
          url: '/submit',
          data: formData,
          dataType: 'json',
          type: 'POST'
        });
      };
  
      console.log(formData);
  
      postData().done(function (data) {
        $('#alert-msg').text(data.result);
        $('#alertModal').modal('show');
        $('select option:selected').val('');
        $('#input-name').val('');
        $('#input-email').val('');
        $('#input-phone').val('');
      });
    });
  
    */
  //create data object for post


  //submit form data

  //media queries using modernizr
  //on very small screens
  $(window).resize(function () {
    if (Modernizr.mq('(min-width: 320px)')) {
      //$('#navbrand').html('42 Full Stack -xs');
      $('#launch-tag').html('Launch Price: <s>Rs 34650</s> <b>Rs 27450</b> ')
    }
  })
  //on small screens
  $(window).resize(function () {
    if (Modernizr.mq('(min-width: 544px)')) {
      //$('#navbrand').html('42 Full Stack -mo');
    }
  })
  //on tablet size screens
  $(window).resize(function () {
    if (Modernizr.mq('(min-width: 768px)')) {
      //$('#navbrand').html('42 Full Stack -tab');
    }
  })
  //on laptops small desktops

  $(window).resize(function () {
    if (Modernizr.mq('(min-width: 992px)')) {
      //$('#navbrand').html('42 Full Stack - lap');
    }
  })
  //on large desktops

  $(window).resize(function () {
    if (Modernizr.mq('(min-width: 1200px)')) {
      //$('#navbrand').html('42 Full Stack -desk');
    }
  }).resize(); // causes an initial resize to occur
});
