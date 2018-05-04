$(document).ready(function(){
    $('.selectpicker').selectpicker();
    var lttreadmore = $("a.lttreadmorebtn");
    lttreadmore.on("click",function(){
        var lttpara = $("#ltt-para");
        lttpara.slideToggle("fast");
        $(this).slideToggle("fast");
    });
    var lttreadless = $("a.lttreadlessbtn");
    lttreadless.on("click",function(){
        var lttpara = $("#ltt-para");
        lttpara.slideToggle("fast");
        lttreadmore.slideToggle("fast");
    });
    //mtt slider
    var mttreadmore = $("a.mttreadmorebtn");
    mttreadmore.on("click",function(){
        var mttpara = $("#mtt-para");
        mttpara.slideToggle("fast");
        $(this).slideToggle("fast");
    });
    var mttreadless = $("a.mttreadlessbtn");
    mttreadless.on("click",function(){
        var mttpara = $("#mtt-para");
        mttpara.slideToggle("fast");
        mttreadmore.slideToggle("fast");
    });
    //gtc slider
    var gtcreadmore = $("a.gtcreadmorebtn");
    gtcreadmore.on("click",function(){
        var gtcpara = $("#gtc-para");
        gtcpara.slideToggle("fast");
        $(this).slideToggle("fast");
    });
    var gtcreadless = $("a.gtcreadlessbtn");
    gtcreadless.on("click",function(){
        var gtcpara = $("#gtc-para");
        gtcpara.slideToggle("fast");
        gtcreadmore.slideToggle("fast");
    });
    $('#input-email').height($('#submit-button').height());
    $('#batch-select').height($('#submit-button').height());

    //media queries using modernizr
    //on very small screens
    $(window).resize(function(){
        if (Modernizr.mq('(min-width: 320px)')){
            $('#navbrand').html('42 Full Stack -xs');
        }
    })
    //on small screens
    $(window).resize(function(){
        if (Modernizr.mq('(min-width: 544px)')){
            $('#navbrand').html('42 Full Stack -mo');
        }
    })
    //on tablet size screens
    $(window).resize(function(){
        if (Modernizr.mq('(min-width: 768px)')){
            $('#navbrand').html('42 Full Stack -tab');
        }
    })
    //on laptops small desktops

    $(window).resize(function(){
        if (Modernizr.mq('(min-width: 992px)')){
            $('#navbrand').html('42 Full Stack - lap');
        }
    })
    //on large desktops

    $(window).resize(function(){
        if (Modernizr.mq('(min-width: 1200px)')){
            $('#navbrand').html('42 Full Stack -desk');
        }
    }).resize(); // causes an initial resize to occur
});


