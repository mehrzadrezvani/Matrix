$(document).ready(function(event){
    //Prevent form submit
    $("body").on('submit','form',function(event){
        type = $(this).attr('type');
        id = $(this).attr('id');
        if(filter){
            $('#price').val(html5Slider.noUiSlider.get());
        }

        if(type != 'active'){
            event.preventDefault();
        }

        if(id === 'contactUsForm'){
            postRequest(this, 'contactUs');
        }

        /**
         * Login Form
         */
        if(id === 'loginform'){
            postRequest(this, 'loginRequest');
        }

        /**
         * Register Form
         */
        if(id === 'registerForm'){
            password = $('#registerPassword').val();
            repassword = $('#registerTryPassword').val();
            if(password === repassword){
                agreement = $('#registerAgreement').is(':checked');
                if(agreement){
                    postRequest(this, 'registerRequest');
                }else{
                    alert('برای عضویت در هایپرتایر پذیرش قوانین و مقررات آن الزامی است.');
                }
            }else{
                alert('رمز عبور و تکرار آن یکسان نیست!');
            }
        }

        /**
         * User Activate Form
         */
        if(id === 'activateForm'){
            postRequest(this, 'activateRequest');
        }

    });
    //Prevent default
    $("body").on('click','.prevent',function(event){
        event.preventDefault();
    });
    //Prevent default
    $("body").on('click','#response-ticket',function(event){
        $(this).parent().next().toggle();
    });
    //Prevent default
    $("body").on('change','.addAddress input,.addAddress select,.addAddress textarea',function(event){
        $(this).removeClass("is-invalid-input");
    });
    //Send comment from articles
    $("body").on('click','.comment-section-form.article .button.success',function(event){
        postRequest(this, 'articleComment');
    });
    //Send comment from articles
    $("body").on('click','label.disabled',function(event){
        message = $(this).attr('message');
        alert(message);
    });
    //Send comment from articles
    $("body").on('click','.neo-alert button',function(event){
        $(this).parents('.neo-alert').hide(0);
    });
    //Like article
    $("body").on('click','.share-on-social .fas.fa-heart',function(event){
        postRequest(this, 'articleLike');
    });
    //Display reply to comment
    $("body").on('click','.fas.fa-reply',function(event){
        $(this).parents('.comment-like-section').next().show();
    });
    //Display reply to comment
    $("body").on('click','.ticket-attaches .close-button',function(event){
        $(this).parent().remove();
    });
    //Display reply to comment
    $("body").on('click','.replySubmit',function(event){
        postRequest(this, 'replyComment');
    });
    //Like comment
    $("body").on('click','.comment-like-section .hypertire-thumbs-o-up',function(event){
        postRequest(this, 'commentLike');
    });
    //DisLike comment
    $("body").on('click','.comment-like-section .hypertire-thumbs-o-down',function(event){
        postRequest(this, 'commentDisLike');
    });
    //Pagination of articles
    $("body").on('click','.pagination a.paginate',function(event){
        page = $(this).attr('href');
        event.preventDefault();
        window.location = "?"+queryString + '&page=' + page;
    });
    //Sort tires
    $("body").on('change','.pagination a.paginate',function(event){
        value = $(this).val();
        event.preventDefault();
        window.location = "?"+queryString + '&sort=' + value;
    });
    //in stock tires
    $("body").on('change','#available-product',function(event){
        value = $(this).is(':checked');
        if(value){
            value = 'true';
        }else{
            value = 'false';
        }
        event.preventDefault();
        window.location = "?"+queryString + '&stock=' + value;
    });
    //Pagination of articles
    $("body").on('change','#categories',function(event){
        value = $(this).val();
        window.location = "?"+queryString + '&category=' + value;
    });
    //Pagination of articles
    $("body").on('change','#sorter',function(event){
        value = $(this).val();
        window.location = "?"+queryString + '&sort=' + value;
    });
    //Pagination of articles
    $("body").on('click','.basket-list .hypertire-trash-o.big-icon',function(event){
        deleteRequest(this, 'deleteBasketItem');
    });
    //New Address
    $("body").on('click','#addNewAddress',function(event){
        $('.addAddress').show(0);
        newAddress();
        mapMaker();
    });
    //Close address box
    $("body").on('click','.addAddress .close-button',function(event){
        $('.addAddress').hide(0);
    });
    //Close update address box
    $("body").on('click','.updateAddress .close-button',function(event){
        $('.updateAddress').hide(0);
    });
    //Close update address box
    $("body").on('click','.neo-confirm button',function(event){
        $('.neo-confirm').hide(0);
    });
    //Select address
    $("body").on('change','input[name=select-address]',function(event){
            postRequest(this, 'addAddressToBasket');
    });
    //Select install status
    $("body").on('change','#basketHolder .switch-input',function(event){
            postRequest(this, 'addInstallItem');
    });
    //Select install status
    $("body").on('change','#extraServices input[type=checkbox]',function(event){
            postRequest(this, 'addService');
    });
    //Select install status
    $("body").on('click','input[name=DeliveryType]',function(event){
            postRequest(this, 'deliveryType');
    });
    //Select install status
    $("body").on('click','input[name=time]',function(event){
            postRequest(this, 'timeSheet');
    });
    //Select install status
    $("body").on('click','input[name=payment]',function(event){
            postRequest(this, 'paymentMethod');
    });
    //Select install status
    $("body").on('change','select[name=payment-method]',function(event){
            postRequest(this, 'paymentMethod');
    });
    //Select install status
    $("body").on('change','#hard-invoice',function(event){
            postRequest(this, 'paymentInvoice');
    });
});

String.prototype.PN = function() {
    return this.replace(/\d+/g, function(digit) {
        var ret = '';
        for (var i = 0, len = digit.length; i < len; i++) {
            ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
        }

        return ret;
    });
};

function newAddress() {
    $('#full_name').val('');
    $('#mobile').val('');
    $('#postal').val('');
    $('#state').val('0').change();
    $('#address').val('');
    $('#geolocation').val('');
}

var mapStatus = true;
function mapMaker() {
    if(mapStatus){
        var myMap = new L.Map('map',{
            key: 'web.3idvnDTMOWbwkfRW6eRnW3CuF7gvquxtMLYapRWd',
            maptype: 'dreamy',
            poi: true,
            traffic: false,
            center: [35.699739, 51.338097],
            zoom: 14
        });
        $(document).ready(function(){
            $('#coordinate').val('35.699739,51.338097');
        });
        L.marker([35.699739, 51.338097], {draggable: true}).addTo(myMap).on('dragend', dragEnd);
        function dragEnd(e)
        {
            $('#coordinate').val(e.target._latlng.lat + ',' + e.target._latlng.lng);
        }
        mapStatus = false;
    }
}
var upMapStatus = true;
var myUpMap = '';
var upMapMarker = '';

function upMapMaker(lat, lng) {
    if(upMapStatus){
        myUpMap = new L.Map('up_map',{
            key: 'web.3idvnDTMOWbwkfRW6eRnW3CuF7gvquxtMLYapRWd',
            maptype: 'dreamy',
            poi: true,
            traffic: false,
            center: [lat, lng],
            zoom: 14
        });
        $(document).ready(function(){
            $('#up_coordinate').val(lat + ',' + lng);
        });
        upMapMarker = L.marker([lat, lng], {draggable: true}).addTo(myUpMap).on('dragend', upDragEnd);
        function upDragEnd(e)
        {
            $('#up_coordinate').val(e.target._latlng.lat + ',' + e.target._latlng.lng);
        }
        upMapStatus = false;
    }else{
        var newLatLng = new L.LatLng(lat, lng);
        myUpMap.setView(newLatLng, 14);
        upMapMarker.setLatLng(newLatLng);
    }
}

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

var basketStep = 1;
// Text limitations
$(document).ready(function () {

    // Like dislike
    $('.comment-like-section .like,.comment-like-section .dislike').on('click', function() {
        event.preventDefault();
        $('.active').removeClass('active');
        $(this).addClass('active');
    });
    // Star rating

    $('[data-rating] .star').on('click', function () {
        var selectedCssClass = 'selected';
        var $this = $(this);
        $this.siblings('.' + selectedCssClass).removeClass(selectedCssClass);
        $this
            .addClass(selectedCssClass)
            .parent().addClass('is-voted');
    });


    var x = 0;
    // description shortage
    $(document).each(function (i) {
        var len = $(this).text().trim().length;
        if (len > 100) {
            // Homepage article
            length = $('body .short-desc').length;
            x = 0;
            while(x < length){
                $(".short-desc").eq(x).text($(".short-desc").eq(x).text().substr(0, 310) + '...')
                x++;
            }
        }
    });

    // Basket multi step forms
    $('.form .stages label').click(function () {
        var radioButtons = $('.form input:radio');
        var selectedIndex = radioButtons.index(radioButtons.filter(':checked'));
        selectedIndex = selectedIndex + 1;
    });

    $('button.confirm-btn').click(function () {
        getRequest(this, 'basketStepChecker');
    });

    // off-canvas
    $('a.left-off-canvas-toggle').on('click', function () {});



    // Products list switches
    $('#switch-toggle-all [data-toggle-all]').click(function () {
        $('#switch-toggle-all input[type="checkbox"]').prop('checked', this.checked)
    });

    // Custom search js
    $("img.car-type").click(function () {
        $(".lvl-1").addClass('hide');
        $(".lvl-2").removeClass('hide');
    });
    $(".lvl-2 img").click(function () {
        $(".lvl-2").addClass('hide');
        $(".lvl-3").removeClass('hide');
    });
    $(".lvl-3 img").click(function () {
        $(".lvl-3").addClass('hide');
        $(".lvl-4").removeClass('hide');
    });
    $(".lvl-4 .set-btn").click(function () {
        $(".lvl-4").addClass('hide');
        $(".lvl-5").removeClass('hide');
    });


    // login containers

    $("#forgot-password").click(function () {
        $(".login-container").addClass('hide');
        $(".forgot-password-container").removeClass('hide');
    });
    $("#register-form-btn").click(function () {
        $(".login-container").addClass('hide');
        $(".register-container").removeClass('hide');
    });
    $("#login-form-btn").click(function () {
        $(".login-container").removeClass('hide');
        $(".register-container").addClass('hide');
    });
    $("#register-btn").click(function () {
        $(".register-container").addClass('hide');
        $(".activation-container").removeClass('hide');
    });

    // Support > New ticket

    $(".new-ticket").click(function () {
        $(".new-ticket-container").slideToggle();
    });
    $(".new-return").click(function () {
        $(".new-return-container").slideToggle();
    });
    $(".ticket-answer-btn").click(function () {
        $(".answer-box").slideToggle();
    });
    // Product gallery
    $('.sim-thumb').on('click', function () {
        $('#main-product-image').attr('src', $(this).data('image'));
    });


    // Product detail > Compare bottom panel


    function updateLinkAndCounter() {
        var ids = $('.prod-id').map(function (i, x) {
            return ['.count-compare', ++i, '=', $(this).text()].join('');
        }).toArray();

        $('.compare-container > a').attr('href', 'Compare.html?' + ids.join('&'));

        var count = $(".box").length;
        $(".count-compare").text(count == 1 ? ' تعداد 1 محصول جهت مقایسه اضافه شده است. ' : ' تعداد ' + count + ' محصول جهت مقایسه اضافه شده است ');
    }

    $(".more").click(function () {
        var id = $(this).next('.ProdId').html();
        $('<div/>', {
            'class': 'box'
        })
            .append($('<span/>', {
                class: 'prod-id',
                text: id
            }))
            .appendTo('.compare-container');

        updateLinkAndCounter();
        $(".compare-container").removeClass("hide");
    });
    $(".clos-btn-container").click(function () {
        $(".compare-container").addClass("hide");
    });

    $(".box a").click(function () {
        $(this).parent().remove();
        updateLinkAndCounter();
    });



    // Product detail > Graph [chart.js]

    var ctx = $("#line-chart");
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["10/11", "11/11", "12/11", "13/11", "14/11", "15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11"],

            datasets: [
                {
                    label: "1397",
                    data: [10, 8, 6, 5, 12, 8, 16, 17, 6, 7, 6, 10],
                    color: "#000",
                }
            ]
        }
    });
});

// file upload file name
(function () {

    // Attach the change event listener to change the label of all input[type=file] elements
    var els = document.querySelectorAll("input[type=file]"),
        i;
    for (i = 0; i < els.length; i++) {
        els[i].addEventListener("change", function () {
            var label = this.previousElementSibling;
            label.innerHTML = this.files[0].name;
        });
    }

})();

// Sticky menu
$(window).scroll(function () {
    if (Foundation.MediaQuery.atLeast('medium')) {
        if ($(window).scrollTop() >= 80) {
            $(".menu-visibility ul").css("opacity", "0");
            $(".header-logo").addClass("logo-resize");
            $(".top-header").css("background-color", "rgba(254,217,6,1)");
            $(".hypertire-shopping-cart,.tire-search, .signup-in-up").css("color", "#204558");
            $(".rectangle-bottom").css("opacity","1");


        }
        if ($(window).scrollTop() <= 80) {
            $(".menu-visibility ul").css("opacity", "100");
            $(".header-logo").removeClass("logo-resize");
            $(".top-header").css("background-color", "rgba(255,255,255,1)");

            $(".hypertire-shopping-cart").css("color", "rgba(118,118,118,1)");
            $(".tire-search").css("color", "rgba(241,174,12,1)");
            $(".signup-in-up").css("color", "rgba(91,116,31,1)");
            $(".rectangle-bottom").css("opacity","0");

        }
    }
});

// Compare page
jQuery(document).ready(function ($) {
    function productsTable(element) {
        this.element = element;
        this.table = this.element.children('.cd-products-table');
        this.tableHeight = this.table.height();
        this.productsWrapper = this.table.children('.cd-products-wrapper');
        this.tableColumns = this.productsWrapper.children('.cd-products-columns');
        this.products = this.tableColumns.children('.product');
        this.productsNumber = this.products.length;
        this.productWidth = this.products.eq(0).width();
        this.productsTopInfo = this.table.find('.top-info');
        this.featuresTopInfo = this.table.children('.features').children('.top-info');
        this.topInfoHeight = this.featuresTopInfo.innerHeight() + 30;
        this.leftScrolling = true;
        this.filtering = false,
            this.selectedproductsNumber = 0;
        this.filterActive = false;
        this.navigation = this.table.children('.cd-table-navigation');
        // bind table events
        this.bindEvents();
    }

    productsTable.prototype.bindEvents = function () {
        var self = this;
        //detect scroll left inside producst table
        self.productsWrapper.on('scroll', function () {
            if (!self.leftScrolling) {
                self.leftScrolling = true;
                (!window.requestAnimationFrame) ? setTimeout(function () {
                    self.updateLeftScrolling();
                }, 250): window.requestAnimationFrame(function () {
                    self.updateLeftScrolling();
                });
            }
        });

    }

    productsTable.prototype.updateLeftScrolling = function () {
        var totalTableWidth = parseInt(this.tableColumns.eq(0).outerWidth(true)),
            tableViewport = parseInt(this.element.width()),
            scrollLeft = this.productsWrapper.scrollLeft();

        (scrollLeft > 0) ? this.table.addClass('scrolling'): this.table.removeClass('scrolling');

        if (this.table.hasClass('top-fixed') && checkMQ() == 'desktop') {
            setTranformX(this.productsTopInfo, '-' + scrollLeft);
            setTranformX(this.featuresTopInfo, '0');
        }

        this.leftScrolling = true;

        this.updateNavigationVisibility(scrollLeft);
    }



    productsTable.prototype.updateTopScrolling = function (scrollTop) {
        var offsetTop = this.table.offset().top,
            tableScrollLeft = this.productsWrapper.scrollLeft();

        if (offsetTop <= scrollTop && offsetTop + this.tableHeight - this.topInfoHeight >= scrollTop) {
            //fix products top-info && arrows navigation
            if (!this.table.hasClass('top-fixed') && $(document).height() > offsetTop + $(window).height() + 200) {
                this.table.addClass('top-fixed').removeClass('top-scrolling');
                if (checkMQ() == 'desktop') {
                    this.productsTopInfo.css('top', '0');
                    this.navigation.find('a').css('top', '0px');
                }
            }

        } else if (offsetTop <= scrollTop) {
            //product top-info && arrows navigation -  scroll with table
            this.table.removeClass('top-fixed').addClass('top-scrolling');
            if (checkMQ() == 'desktop') {
                this.productsTopInfo.css('top', (this.tableHeight - this.topInfoHeight) + 'px');
                this.navigation.find('a').css('top', (this.tableHeight - this.topInfoHeight) + 'px');
            }
        } else {
            //product top-info && arrows navigation -  reset style
            this.table.removeClass('top-fixed top-scrolling');
            this.productsTopInfo.attr('style', '');
            this.navigation.find('a').attr('style', '');
        }

        this.updateLeftScrolling();
    }

    productsTable.prototype.updateProperties = function () {
        this.tableHeight = this.table.height();
        this.productWidth = this.products.eq(0).width();
        this.topInfoHeight = this.featuresTopInfo.innerHeight() + 30;
        this.tableColumns.css('width', this.productWidth * this.productsNumber + 'px');
    }

    productsTable.prototype.resetSelection = function () {
        this.tableColumns.css('width', this.productWidth * this.productsNumber + 'px');
        this.element.removeClass('no-product-transition');
        this.resetProductsVisibility();
    }



    productsTable.prototype.resetProductsVisibility = function () {
        var self = this,
            containerOffsetLeft = self.tableColumns.offset().left,
            selectedProducts = this.products.filter('.selected'),
            numberProducts = selectedProducts.length,
            scrollLeft = self.productsWrapper.scrollLeft(),
            n = 0;

        self.element.addClass('no-product-transition').removeClass('filtered');

        self.products.each(function (index) {
            var product = $(this);
            if (product.hasClass('selected')) {
                n = n + 1;
                var leftTranslate = (-index + n - 1) * self.productWidth;
                setTranformX(product, leftTranslate);
            }
        });

        setTimeout(function () {
            self.element.removeClass('no-product-transition filtering');
            setTranformX(selectedProducts, '0');
            selectedProducts.removeClass('selected').attr('style', '');
        }, 50);
    }

    productsTable.prototype.updateSlider = function (bool) {
        var scrollLeft = this.productsWrapper.scrollLeft();
        scrollLeft = (bool) ? scrollLeft + this.productWidth : scrollLeft - this.productWidth;

        if (scrollLeft < 0) scrollLeft = 0;
        if (scrollLeft > this.tableColumns.outerWidth(true) - this.productsWrapper.width()) scrollLeft = this.tableColumns.outerWidth(true) - this.productsWrapper.width();

        this.productsWrapper.animate({
            scrollLeft: scrollLeft
        }, 200);
    }

    var comparisonTables = [];
    $('.cd-products-comparison-table').each(function () {
        //create a productsTable object for each .cd-products-comparison-table
        comparisonTables.push(new productsTable($(this)));
    });

    var windowScrolling = false;
    //detect window scroll - fix product top-info on scrolling
    $(window).on('scroll', function () {
        if (!windowScrolling) {
            windowScrolling = false;
            (!window.requestAnimationFrame) ? setTimeout(checkScrolling, 250): window.requestAnimationFrame(checkScrolling);
        }
    });

    var windowResize = false;
    //detect window resize - reset .cd-products-comparison-table properties
    $(window).on('resize', function () {
        if (!windowResize) {
            windowResize = true;
            (!window.requestAnimationFrame) ? setTimeout(checkResize, 250): window.requestAnimationFrame(checkResize);
        }
    });

    function checkScrolling() {
        var scrollTop = $(window).scrollTop();
        comparisonTables.forEach(function (element) {
            element.updateTopScrolling(scrollTop);
        });

        windowScrolling = false;
    }

    function checkResize() {
        comparisonTables.forEach(function (element) {
            element.updateProperties();
        });

        windowResize = false;
    }

    function checkMQ() {
        //check if mobile or desktop device
        return window.getComputedStyle(comparisonTables[0].element.get(0), '::after').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
    }

    function setTranformX(element, value) {
        element.css({
            '-moz-transform': 'translateX(' + value + 'px)',
            '-webkit-transform': 'translateX(' + value + 'px)',
            '-ms-transform': 'translateX(' + value + 'px)',
            '-o-transform': 'translateX(' + value + 'px)',
            'transform': 'translateX(' + value + 'px)'
        });
    }
});


/**
 * Send and manipulate comment
 */
function articleComment(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['comment'] = $('#articleText').val();
    jsonData['selector'] = pageSelector;
    jsonData['model'] = pageModel;
    path = '/comments/comment/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function articleCommentRes(res,params){
    try {
        if(res['code'] == '1'){
            $('.comment-section').slideUp(500);
            notify('نظر شما با موفقیت ثبت شد و پس از بررسی نمایش داده خواهد شد.', 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify('در ثبت نظر شما مشکلی ایجاد شد لطفا بعدا امتحان کنید.', 'warning');
        }
    } catch (e) {
        notify('در ثبت نظر شما مشکلی ایجاد شد لطفا بعدا امتحان کنید.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function replyComment(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['comment'] = $(el).prev().val();
    jsonData['selector'] = $(el).attr('selector');
    path = '/comments/reply/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function replyCommentRes(res,params){
    try {
        if(res['code'] == '1'){
            $(params[0]).parent().slideUp(500);
            notify('جواب شما به این کامنت با موفقیت ثبت شد.', 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify('در ثبت نظر شما مشکلی ایجاد شد لطفا بعدا امتحان کنید.', 'warning');
        }
    } catch (e) {
        notify('در ثبت نظر شما مشکلی ایجاد شد لطفا بعدا امتحان کنید.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function articleLike(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['selector'] = pageSelector;
    jsonData['model'] = pageModel;
    path = '/likes/like/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function articleLikeRes(res,params){
    try {
        if(res['code'] == '1'){
            $(params[0]).css('color', 'red');
            notify(res['message']['message'], 'success');
        }else if(res['code'] == '2'){
            $(params[0]).css('color', 'grey');
            notify(res['message']['message'], 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate commentbas
 */
function commentLike(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['selector'] = $(el).attr('selector');
    jsonData['model'] = 'Comments';
    path = '/likes/like/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function commentLikeRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message']['message'], 'success');
            $(params[0]).parents('.rating').find('.hypertire-thumbs-o-up').html(res['message']['counter'][0]);
            $(params[0]).parents('.rating').find('.hypertire-thumbs-o-down').html(res['message']['counter'][1]);
        }else if(res['code'] == '2'){
            notify(res['message']['message'], 'success');
            $(params[0]).parents('.rating').find('.hypertire-thumbs-o-up').html(res['message']['counter'][0]);
            $(params[0]).parents('.rating').find('.hypertire-thumbs-o-down').html(res['message']['counter'][1]);
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function commentDisLike(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['selector'] = $(el).attr('selector');
    jsonData['model'] = 'Comments';
    path = '/likes/dislike/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function commentDisLikeRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message']['message'], 'success');
            $(params[0]).parents('.rating').find('.hypertire-thumbs-o-up').html(res['message']['counter'][0]);
            $(params[0]).parents('.rating').find('.hypertire-thumbs-o-down').html(res['message']['counter'][1]);
        }else if(res['code'] == '2'){
            notify(res['message']['message'], 'success');
            $(params[0]).parents('.rating').find('.hypertire-thumbs-o-up').html(res['message']['counter'][0]);
            $(params[0]).parents('.rating').find('.hypertire-thumbs-o-down').html(res['message']['counter'][1]);
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function addToBasket(el){
    //Get information from form inputs
    var jsonData = {};
    count = $('#count-item').val();
    path = '/basket/basket/'+selector+'/'+count;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function addToBasketRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message']['message'], 'success');
            getRequest(params[0], 'basketDetails');
            $(params[0]).attr('onclick', 'deleteRequest(this, \'deleteBasketItem\')');
            $(params[0]).html('<i class="hypertire-caddie-shopping-streamline"></i>حذف از سبد خرید');
            $(params[0]).removeClass('success');
            $(params[0]).addClass('green');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}
/**
 * Send and manipulate comment
 */
function increaseBasket(el){
    //Get information from form inputs
    var jsonData = {};
    count = $(el).val();
    itemSelector = $(el).parents('tr').attr('selector');
    path = '/basket/basket/'+itemSelector+'/'+count;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function increaseBasketRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message']['message'], 'success');
            getRequest(params[0], 'basketDetails');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $(params[0]).val(res['count']);
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}
/**
 * Send and manipulate comment
 */
function deleteBasketItem(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).attr('selector');
    path = '/basket/basket/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function deleteBasketItemRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message']['message'], 'success');
            getRequest(params[0], 'basketDetails');
            selector = $(params[0]).attr('selector');
            $('button[selector='+selector+']').html('<i class="hypertire-caddie-shopping-streamline"></i>اضافه به سبد خرید');
            $('button[selector='+selector+']').removeClass('green');
            $('button[selector='+selector+']').attr('onclick', 'postRequest(this, \'addToBasket\')');
            $('button[selector='+selector+']').addClass('success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function basketDetails(el){
    //Get information from form inputs
    var jsonData = {};
    path = '/basket/details/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function basketDetailsRes(res,params){
    basketMaker(res);
}

/**
 * Basket generator
 * @param res
 */
function basketMaker(res) {
    count = res['count'];
    details = res['basket'];
    basketSrvices = res['basket-service-items'];
    paymentPrice = res['price-receipt']['payment-price'];
    totlaPrice = res['price-receipt']['totalItems'];
    installPrice = res['price-receipt']['install'];
    servicesPrice = res['price-receipt']['services'];
    deliveryTypes = res['delivery-types'];
    deliveryTypeVal = res['delivery-type'];
    timeSheets = res['delivery-time-sheets'];
    timeSheetVal = res['delivery-time-sheet'];
    addressValue = res['basket-address'];

    /**
     * Display and Hide basket icon on navigation bar
     */
    if(count > 0){
        $('.badge.success.basket-badge').removeClass('hide');
        $('.real-basket.empty').addClass('hide');
        $('.real-basket.full').removeClass('hide');
        $('.badge.success.basket-badge').html(count);
    }else{
        $('.badge.success.basket-badge').addClass('hide');
        $('.real-basket.empty').removeClass('hide');
        $('.real-basket.full').addClass('hide');
        $('.badge.success.basket-badge').html(count);
    }

    /**
     * Generate product items in navigation bar basket
     * @type {string}
     */
    var txt = '';
    for (var key in details) {
        txt += '                         <li>\n' +
            '                                <a href="#nogo" title="مشاهده کالا"> <img src="'+details[key]['cover']+'" alt="product-name"></a>\n' +
            '                                <span>'+details[key]['brand']+' <br>'+details[key]['size']+' <br> تعداد: '+details[key]['count']+'</span>\n' +
            '                                <a href="#nogo"><i class="hypertire-trash-o big-icon" title="حذف"></i></a>\n' +
            '                            </li>';
    }
    $('.real-basket.full').find('ul').html(txt);

    /**
     * Generate products items in basket page
     * @type {string}
     */
    var txt = '';
    for (var key in details) {
        xd = 1;
        checked = [];
        while(xd < 6){
            if(details[key]['count'] == xd){
                checked[xd] = 'selected';
            }
            xd++;
        }

        installStatus = '';
        if(details[key]['install'] == '1'){
            installStatus = 'checked';
        }

        installCan = 'disabled';
        installCanMessage = 'لطفا برای فعال سازی این خدمات ابتدا آدرس ارسال را انتخاب کنید.';
        if(res['basket-install-can'] == '2'){
            installCan = 'disabled';
            installCanMessage = 'متاسفانه این خدمت در آدرس شما قابل ارائه نیست.';
        }else if(res['basket-install-can'] == '0'){
            installCan = 'disabled';
            installCanMessage = 'لطفا برای فعال سازی این خدمات ابتدا آدرس ارسال را انتخاب کنید.';
        }else{
            installCan = '';
            installCanMessage = '';
        }

        txt += '<tr selector="'+details[key]['selector']+'">\n' +
            '    <td class="text-center"><a href="/tires/"><img src="'+details[key]['cover']+'" class="product-thumbnail"></a></td>\n' +
            '    <td class="text-center">'+details[key]['brand']+'</td>\n' +
            '    <td class="text-center">'+details[key]['size']+'</td>\n' +
            '    <td class="text-center">\n' +
            '        <select onchange="postRequest(this, \'increaseBasket\')">\n' +
            '            <option value="1" '+ checked[1] +'>1</option>\n' +
            '            <option value="2" '+ checked[2] +'>2</option>\n' +
            '            <option value="3" '+ checked[3] +'>3</option>\n' +
            '            <option value="4" '+ checked[4] +'>4</option>\n' +
            '            <option value="5" '+ checked[5] +'>5</option>\n' +
            '        </select>\n' +
            '    </td>\n' +
            '    <td class="text-center">\n' +
            '        <div class="switch small switch-align">\n' +
            '            <input class="switch-input" id="installation-switch'+ key +'" type="checkbox" '+ installStatus +' '+ installCan +'>\n' +
            '            <label message="'+installCanMessage+'" class="switch-paddle '+ installCan +'" for="installation-switch'+ key +'"><span class="show-for-sr"> </span></label>\n' +
            '        </div>\n' +
            '    </td>\n' +
            '    <td class="text-center">\n' +
            '        <a href="#nogo"><i onclick="deleteRequest(this, \'deleteBasketItem\')" selector="'+ details[key]['selector'] +'" class="hypertire-trash-o big-icon" title="حذف"></i></a> |\n' +
            '        <a href="/tires/"><i class="hypertire-external-link-sqaure big-icon" title="نمایش کالا"></i></a>\n' +
            '    </td>\n' +
            '</tr>';
    }
    $('#basketHolder').html(txt);

    /**
     * Extra services maker
     */
    extraStr = '';
    installStatus = res['basket-install'];
    for (var key in basketSrvices) {
        tiresOptions = '<option value="">تعداد حلقه</option>';
        if(installStatus == '0'){
            installStatusClass = 'disabled';
        }else{
            installStatusClass = '';
        }
        if(basketSrvices[key]['status'] == '0' || (basketSrvices[key]['tires'] < basketSrvices[key]['count'])){
            checkedStatus = '';
        }else{
            checkedStatus = 'checked';

        }
        xt = 0;
        while(xt < basketSrvices[key]['tires']){
            xt++;
            selectedServiceTire = '';

            if(xt == basketSrvices[key]['count']){
                selectedServiceTire = 'selected';
            }
            tiresOptions += '<option value="'+xt+'" '+selectedServiceTire+'>'+xt+'</option>'
        }

        extraStr += '<div class="large-12 small-12 cell extraServiceRow" selector="'+key+'" >\n' +
            '           <div class="callout gray cell">\n' +
            '               <div class="switch tiny services-flex">\n' +
            '                   <div class="column">\n' +
            '                       <select id="servicesCount-'+key+'">'+tiresOptions+'</select>\n' +
            '                   </div>\n' +
            '                   <div class="column text-center">\n' +
            '                       <input class="switch-input" id="extra-services-'+key+'" type="checkbox"\n' +
            '                              name="extra-services" required '+installStatusClass+' '+checkedStatus+'>\n' +
            '                       <label message="لطفا برای انتخاب این سرویس، خدمات نصب را برای یک یا چند محصول فعال کنید." class="switch-paddle '+installStatusClass+'" for="extra-services-'+key+'"  title="برای استفاده از این خدمت آدرس خود را انتخاب کنید.">\n' +
            '                       </label>\n' +
            '                   </div>\n' +
            '                   <div class="column text">\n' +
            '                       <span class="switch-lbl">'+basketSrvices[key]['name']+'</span>\n' +
            '                   </div>\n' +
            '                   <div class="column">\n' +
            '                       <small class="float-left small-height">هزینه : '+formatMoney((basketSrvices[key]['total'] / 10), 0).PN()+' تومان</small>\n' +
            '                   </div>\n' +
            '               </div>\n' +
            '           </div>\n' +
            '</div>';
    }
    $('#extraServices').html(extraStr);

    if(paymentPrice > 0){
        $('#payment-price').html(formatMoney((paymentPrice / 10), 0).PN());
    }else{
        $('#total-rec').hide();
    }
    if(totlaPrice > 0){
        $('#total-price').show();
        $('#total-price').find('.value').html(formatMoney((totlaPrice / 10), 0).PN() + ' تومان ');
    }else{
        $('#total-price').hide();
        $('#total-price').find('.value').html('');
    }

    if(installPrice > 0){
        $('#install-price').show();
        $('#install-price').find('.value').html(formatMoney((installPrice / 10), 0).PN() + ' تومان ');
    }else{
        $('#install-price').hide();
        $('#install-price').find('.value').html('');
    }

    servicesStr = '';
    for (var key in servicesPrice) {
        servicesStr += '<div class="large-8 small-8 cell text-right">\n' +
            '      <small> '+servicesPrice[key]['title']+' :</small>\n' +
            '      </div>\n' +
            '<div class="large-4 small-4 cell text-left">\n' +
            '      <small class="value">'+formatMoney((servicesPrice[key]['total'] / 10), 0).PN() + ' تومان '+'</small>\n' +
            '</div>';
    }
    if(servicesStr == ''){
        $('#services-price').hide(0);
        $('#services-price').html('');
    }else{
        $('#services-price').show(0);
        $('#services-price').html(servicesStr);
    }


    /**
     * Delivery type generator
     */
    deliveryTypesStr = '';
    for (var key in deliveryTypes) {
        if(deliveryTypes[key]['enable'] == 'true'){disable = ''}else{disable = 'disabled'}
        if(deliveryTypes[key]['checked'] == 'true' || key == deliveryTypeVal['selector']){checked = 'checked'}else{checked = ''}
        deliveryTypesStr += '<div class="large-4 small-12 cell" selector="'+key+'">\n' +
            '           <div class="callout gray cell">\n' +
            '               <div class="switch tiny">\n' +
            '                   <input selector="'+key+'" class="switch-input" id="express-delivery'+key+'" type="radio"\n' +
            '                          name="DeliveryType" '+checked+' '+disable+'>\n' +
            '                   <label message="'+deliveryTypes[key]['message']+'" class="switch-paddle" for="express-delivery'+key+'">\n' +
            '                       <span class="show-for-sr">'+deliveryTypes[key]['title']+'</span>\n' +
            '                   </label>\n' +
            '                   <span class="switch-lbl">'+deliveryTypes[key]['title']+'</span>\n' +
            '               </div>\n' +
            '               <div class="text-center">\n' +
            '                   <img class="delivery-icon" src="'+deliveryTypes[key]['icon']+'"\n' +
            '                        alt="Express delivery">\n' +
            '                   <div class="clearfix"></div>\n' +
            '                   <hr>\n' +
            '                   <p class="small-height">'+(formatMoney(deliveryTypes[key]['cost'] + deliveryTypes[key]['courier'], 0).PN())+' تومان</p>\n' +
            '               </div>\n' +
            '           </div>\n' +
            '</div>';
    }
    if(deliveryTypesStr == ''){
        $('#deliverTypesItems').html(deliveryTypesStr);
        $('#deliveryTypeMessage').show();
        $('#deliverTypesItems').hide();
    }else{
        $('#deliverTypesItems').html(deliveryTypesStr);
        $('#deliveryTypeMessage').hide();
        $('#deliverTypesItems').show();
    }


    /**
     * Delivery time sheets
    */
    deliveryTimeSheetsStr = '';
    for (var key in timeSheets) {
        if(key == '0'){active = 'is-active'}else{active = ''}
        deliveryTimeSheetsStr += '<li class="tabs-title '+active+'"><a href="#one-'+key+'"  role="tab" aria-controls="one-'+key+'" aria-selected="false" id="one-'+key+'-label" tabindex="-1"> ('+timeSheets[key][0]['full_day_name']+') '+timeSheets[key][0]['day']+'</a></li>';
    }
    if(deliveryTimeSheetsStr == ''){
        $('.timeSheet-tabs').html('<h4 style="color: red">برای انتخاب زمان ارسال لطفا یکی از انواع ارسال را انتخاب کنید.</h4>');
    }else{
        $('.timeSheet-tabs').html(deliveryTimeSheetsStr);
    }


    /**
     * Delivery time sheets
    */
    deliveryTimeSheetsStr = '';
    for (var key in timeSheets) {
        if(key == '0'){active = 'is-active'}else{active = ''}
        timeSheetSecond = timeSheets[key];
        timeSheetSecondStr = '';
        for (var iKey in timeSheetSecond){
            if(timeSheetSecond[iKey]['capacity'] == 'full'){disabled = 'disabled'; span = '<span class="full-alert">ظرفیت تکمیل</span>';}else{disabled = ''; span = '';}
            if(timeSheetSecond[iKey]['selector'] == timeSheetVal){checked = 'checked';}else{checked = '';}
            timeSheetSecondStr += '<li>\n' +
                '<input type="radio" name="time" id="'+timeSheetSecond[iKey]['selector']+'" ' +
                ''+disabled+' '+checked+'>' +
                '<label for="'+timeSheetSecond[iKey]['selector']+'">ساعت '+timeSheetSecond[iKey]['start']+' الی '+timeSheetSecond[iKey]['end']+'</label>\n' +
                ''+span+'' +
                '</li>';
        }
        deliveryTimeSheetsStr += '<div class="tabs-panel '+active+' no-padding" id="one-'+key+'">\n' +
            '<ul class="time-list">'+timeSheetSecondStr+'</ul>'+
            '</div>';
    }
    if(deliveryTimeSheetsStr == ''){
        $('#time-sheets-inner').html('');
    }else{
        $('#time-sheets-inner').html(deliveryTimeSheetsStr);
    }


    /**
     * Address generator
     */
    if(!jQuery.isEmptyObject(deliveryTypeVal)){
        $('#delivery-price').show();
        $('#delivery-price').find('.value').html(formatMoney((deliveryTypeVal['cost']), 0).PN() + ' تومان ');
    }else{
        $('#delivery-price').hide();
    }

    /**
     * Address generator
     */
    if(!jQuery.isEmptyObject(addressValue)){
        $('#deliver-address-str').show();
        $('#deliver-address-str').find('.value').html(addressValue['address']);
    }else if(addressValue == 'ffffff'){

    }
    else{
        $('#deliver-address-str').hide();
    }
}

/**
 * Send and manipulate comment
 */
function getWidth(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['type'] = $(el).val();
    path = '/sizes/width/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function getWidthRes(res,params){
    var txt = '<option value="width" selected="">پهنای تایر ( width)</option>';
    res.forEach(looper);
    function looper(value, index, array) {
        txt += "<option value=\""+value['width']+"\">"+value['width']+"</option>";
    }
    $(params[0]).next().html(txt);
}

/**
 * Send and manipulate comment
 */
function getAspect(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['width'] = $(el).val();
    path = '/sizes/aspects/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function getAspectRes(res,params){
    var txt = '<option value="Aspect" selected="">نسبت منظر (Aspect)</option>';
    res.forEach(looper);
    function looper(value, index, array) {
        txt += "<option value=\""+value['ratio']+"\">"+value['ratio']+"</option>";
    }
    $(params[0]).next().html(txt);
}

/**
 * Send and manipulate comment
 */
function getRim(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['width'] = $(el).prev().val();
    jsonData['ratio'] = $(el).val();
    path = '/sizes/rim/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function getRimRes(res,params){
    var txt = '<option value="" selected="">قطر رینگ (RIM)</option>';
    res.forEach(looper);
    function looper(value, index, array) {
        txt += "<option value=\""+value['title']+"\">"+value['rim']+"</option>";
    }
    $(params[0]).next().html(txt);
}

/**
 * Send and manipulate comment
 */
function registerAddress(el){
    //Get information from form inputs
    var jsonData = {};
    if($('#address_full_name').length > 0){
        jsonData['full_name'] = $('#address_full_name').val();
        jsonData['postal'] = $('#address_postal').val();
        jsonData['mobile'] = $('#address_mobile').val();
        jsonData['state'] = $('#address_state').val();
        jsonData['city'] = $('#address_city').val();
        jsonData['address'] = $('#address_address').val();
        jsonData['coordinate'] = $('#coordinate').val();
    }else{
        jsonData['full_name'] = $('#full_name').val();
        jsonData['postal'] = $('#postal').val();
        jsonData['mobile'] = $('#mobile').val();
        jsonData['state'] = $('#state').val();
        jsonData['city'] = $('#city').val();
        jsonData['address'] = $('#address').val();
        jsonData['coordinate'] = $('#coordinate').val();
    }
    path = '/addresses/address/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function registerAddressRes(res,params){
    try {
        if(res['result'] == 'true'){
            $('.addAddress').hide(0);
            notify(res['message']['message'], 'success');
            str = '                                <div class="callout gray cell address" selector="' + res['message']['details']['selector'] + '">\n' +
                '                                    <h2>\n' +
                '                                        <input type="radio" name="select-address" value="Red" class="select-address"> <span class="full_name">' + res['message']['details']['full_name'] + '</span>\n' +
                '                                        <a selector="' + res['message']['details']['selector'] + '" onclick="deleteRequest(this, \'displayAddress\')" class="button success margin">تغییر آدرس</a>\n' +
                '                                        <a selector="' + res['message']['details']['selector'] + '" onclick="deleteRequest(this, \'deleteAddress\')" class="button red">حذف آدرس</a>\n' +
                '                                    </h2>\n' +
                '                                    <ul class="list-adress">\n' +
                '                                        <li><i class="hypertire-pin-1"></i> <span class="address">' + res['message']['details']['address'] + '</span>\n' +
                '                                        </li>\n' +
                '                                        <li><i class="hypertire-phone"></i> شماره تماس : <span class="mobile">' + res['message']['details']['mobile'] + '</span></li>\n' +
                '                                        <li><i class="hypertire-mailbox-1"></i> کد پستی : <span class="postal">' + res['message']['details']['postal'] + '</span></li>\n' +
                '\n' +
                '                                    </ul>\n' +
                '                                </div>';
            $('#inventory').append(str);
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message']['message'], 'warning');
            $('#'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function fetchCities(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['state'] = $(el).val();
    path = '/addresses/cities/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function fetchCitiesRes(res,params){
    if(params == undefined){
        nextValue = $('#up_state').attr('next-value');
    }else{
        nextValue = $(params[0]).attr('next-value');
    }

    var txt = '<option value="">شهر</option>';
    res.forEach(looper);
    function looper(value, index, array) {
        selected = '';
        if(nextValue == value['id']){
            selected = 'selected';
        }else{
            selected = '';
        }
        txt += "<option value=\""+value['id']+"\" "+selected+">"+value['city']+"</option>";
    }
    if(params == undefined){
        $('#up_city').html(txt);
    }else{
        $(params[0]).next().html(txt);
        $('#citiesList').html(txt);
        $('#cities').html(txt);
    }
}

/**
 * Send and manipulate comment
 */
function deleteAddress(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).attr('selector');
    path = '/addresses/address/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function deleteAddressRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
            $(params[0]).parents('.address').remove();
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function addAddressToBasket(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).parents('.address').attr('selector');
    path = '/basket/address/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function addAddressToBasketRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
            getRequest(params[0], 'basketDetails');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function addInstallItem(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).parents('tr').attr('selector');
    path = '/basket/install/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function addInstallItemRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
            getRequest(params[0], 'basketDetails');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function addService(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).parents('.extraServiceRow').attr('selector');
    count = $(el).parents('.extraServiceRow').find('select').val();
    if(count == ''){
        $(el).prop("checked", false);
        alert('برای فعال سازی این سرویس یک یا چند حلقه انتخاب کنید.');
        return false;
    }
    path = '/basket/service/'+selector+'/'+count;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function addServiceRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
            getRequest(params[0], 'basketDetails');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function displayAddress(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).attr('selector');
    $('.updateAddress').attr('selector', selector);
    path = '/addresses/address/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function displayAddressRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message']['message'], 'success');
            updateAddressWindow(res['message']['details']);
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message']['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}
function updateAddressWindow(details) {
    if(details['map'].length > 2){
        map = details['map'].split(",");
    }else{
        map = [];
        map[0] = 35.699739;
        map[1] = 51.338097;
    }
    $('.updateAddress').show(0);
    $('#up_full_name').val(details['full_name']);
    $('#up_mobile').val(details['mobile']);
    $('#up_postal').val(details['postal']);
    $('#up_address').val(details['address']);
    $('#up_state').val( details['state']).change();
    $('#up_state').attr('next-value', details['city']);
    upMapMaker(parseFloat(map[0]), parseFloat(map[1]));
}

/**
 * Send and manipulate comment
 */
function updateAddress(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['full_name'] = $('#up_full_name').val();
    jsonData['postal'] = $('#up_postal').val();
    jsonData['mobile'] = $('#up_mobile').val();
    jsonData['state'] = $('#up_state').val();
    jsonData['city'] = $('#up_city').val();
    jsonData['address'] = $('#up_address').val();
    jsonData['coordinate'] = $('#up_coordinate').val();
    console.log(jsonData['coordinate']);
    selector = $('.updateAddress').attr('selector');
    path = '/addresses/address/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function updateAddressRes(res,params){
    try {
        if(res['result'] == 'true'){
            $('.updateAddress').hide(0);
            notify(res['message']['message'], 'success');
            $('div [selector='+res['message']['details']['selector']+']').find('.mobile').html(res['message']['details']['mobile']);
            $('div [selector='+res['message']['details']['selector']+']').find('.postal').html(res['message']['details']['postal']);
            $('div [selector='+res['message']['details']['selector']+']').find('.address').html(res['message']['details']['address']);
            $('div [selector='+res['message']['details']['selector']+']').find('.full_name').html(res['message']['details']['full_name']);
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message']['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function basketStepChecker(el){
    //Get information from form inputs
    var jsonData = {};
    path = '/basket/stepchecker/'+basketStep;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function basketStepCheckerRes(res,params){
    try {
        if(res['code'] == '1'){
            $('.updateAddress').hide(0);
            var radioButtons = $('.form input:radio');
            var selectedIndex = radioButtons.index(radioButtons.filter(':checked'));

            selectedIndex = selectedIndex + 2;
            basketStep = selectedIndex;
            $('.form input[type="radio"]:nth-of-type(' + selectedIndex + ')').prop('checked', true);

            if (selectedIndex == 3) {
                $('button.confirm-btn').html('ثبت نهایی و پرداخت');
            }
        } else if(res['code'] == '2') {
            $('#payment-register').hide();
            $('#success-register').show();
            getRequest(params[0], 'basketDetails');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function deliveryType(el){
    //Get information from form inputs
    var jsonData = {};
    var selector = $(el).attr('selector');
    path = '/basket/deliverytype/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function deliveryTypeRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
            getRequest(params[0], 'basketDetails');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function timeSheet(el){
    //Get information from form inputs
    var jsonData = {};
    var selector = $(el).attr('id');
    path = '/basket/timesheet/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function timeSheetRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
            getRequest(params[0], 'basketDetails');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function paymentMethod(el){
    //Get information from form inputs
    var jsonData = {};
    var className = $(el).attr('class');
    if(className == 'payment-drop'){
        selector = $(el).val();
    }else{
        selector = $(el).parents('.payment-method-box').find('select').val();
    }
    path = '/basket/paymentmethod/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function paymentMethodRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function paymentInvoice(el){
    //Get information from form inputs
    var jsonData = {};
    var className = $(el).attr('class');
    selector = $(el).prop('checked')
    path = '/basket/paymentinvoice/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function paymentInvoiceRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function contactUs(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['full_name'] = $('#full_name').val();
    jsonData['email'] = $('#email').val();
    jsonData['mobile'] = $('#mobile').val();
    jsonData['subject'] = $('#subject').val();
    jsonData['message'] = $('#message').val();
    jsonData['phone'] = $('#phone').val();
    path = '/contact/message/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function contactUsRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message'], 'success');
            $('#contactMessage').show();
            $('#contactUsForm').hide();
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function loginRequest(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['username'] = $('#loginusername').val();
    jsonData['password'] = $('#loginpassword').val();
    remember = $('#remember-inf').is(':checked');
    if(remember){
        remember = 1;
    }else{
        remember = 0;
    }
    jsonData['remember'] = remember;
    path = '/register/checkuser/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function loginRequestRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message']['message'], 'success');
            window.location = '/profile/';
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message']['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function registerRequest(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['username'] = $('#registerUsername').val();
    jsonData['password'] = $('#registerPassword').val();
    path = '/register/do/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function registerRequestRes(res,params){
    try {
        if(res['result'] == 'true'){
            notify(res['message']['message'], 'success');
            $('.register-container').toggleClass('hide');
            $('.activation-container').toggleClass('hide');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function activateRequest(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['code'] = $('#activateCode').val();
    path = '/register/activate/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function activateRequestRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
            window.location = '/profile/';
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function resendActivate(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['code'] = $('#activateCode').val();
    path = '/register/resend/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function resendActivateRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
            $('#up_'+res['message']['name']).addClass('is-invalid-input');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function getCarModel(el){
    //Get information from form inputs
    var jsonData = {};
    var selector = $(el).val();
    path = '/cars/fetchcarmodels/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function getCarModelRes(res,params){
    var txt = '<option value="" selected="">مدل</option>';
    res.forEach(looper);
    function looper(value, index, array) {
        txt += "<option value=\""+value['selector']+"\">"+value['fa_model_title']+"</option>";
    }
    $(params[0]).next().html(txt);
    $('#carModel').html(txt);
}

/**
 * Send and manipulate comment
 */
function getCarTips(el){
    //Get information from form inputs
    var jsonData = {};
    var selector = $(el).val();
    path = '/cars/fetchcartips/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function getCarTipsRes(res,params){
    var txt = '<option value="" selected="">تیپ و سال</option>';
    res.forEach(looper);
    function looper(value, index, array) {
        txt += "<option value=\""+value['selector']+"\">"+value['tip']+ " " + value['end_year'] + "-" + value['start_year']+"</option>";
    }
    $(params[0]).next().html(txt);
    $('#carTip').html(txt);
}

/**
 * Send and manipulate comment
 */
function getCarSizes(el){
    //Get information from form inputs
    var jsonData = {};
    var selector = $(el).val();
    path = '/cars/fetchcarsizes/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function getCarSizesRes(res,params){
    var txt = '<option value="" selected="">سایزها</option>';
    res.forEach(looper);
    function looper(value, index, array) {
        txt += "<option value=\""+value['size']+"\">"+value['title']+"</option>";
    }
    $(params[0]).next().html(txt);
}

/**
 * Send and manipulate comment
 */
function profileUpdate(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['first_name'] = $('#first_name').val();
    jsonData['last_name'] = $('#last_name').val();
    jsonData['melli'] = $('#melli').val();
    jsonData['birthday'] = $('#birthday').val();
    jsonData['gender'] = $('#gender').val();
    jsonData['mobile'] = $('#mobile').val();
    jsonData['email'] = $('#email').val();
    path = '/profile/profile/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function profileUpdateRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function profileCompanyUpdate(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['name'] = $('#name').val();
    jsonData['code'] = $('#code').val();
    jsonData['identity'] = $('#identity').val();
    jsonData['number'] = $('#number').val();
    jsonData['phone'] = $('#phone').val();
    jsonData['postal'] = $('#postal').val();
    jsonData['state'] = $('#state').val();
    jsonData['city'] = $('#cities').val();
    jsonData['address'] = $('#address').val();
    path = '/profile/company/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function profileCompanyUpdateRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function userCarsUpdate(el){
    //Get information from form inputs
    var jsonData = {};
    jsonData['title'] = $('#carTitle').val();
    jsonData['car'] = $('#carTip').val();
    path = '/profile/mycar/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function userCarsUpdateRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function deleteItem(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).attr('selector');
    pathAddress = $(el).attr('path');
    path = pathAddress+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function deleteItemRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
            item = $(params[0]).attr('item');
            $('#'+item).remove();
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function updatePassword(el){
    //Get information from form inputs
    var jsonData = {};
    path = '/profile/updatePassword/';
    cPassword = $('#currentPassword').val();
    nPassword = $('#newPassword').val();
    rPassword = $('#repeatPassword').val();
    if(nPassword !== rPassword){
        alert('رمز عبور جدید با تکرار آن برابر نیست');
        return false;
    }
    jsonData['currentPassword'] = cPassword;
    jsonData['newPassword'] = nPassword;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function updatePasswordRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function registerTicket(el){
    //Get information from form inputs
    var jsonData = {};
    path = '/tickets/ticket/';
    title = $('#subject').val();
    section = $('#section').val();
    invoice = $('#invoice').val();
    message = $('#message').val();
    if(title.length < 10){
        alert('عنوان تیکت نباید از 10 کاراکتر کمتر باشد.');
        return false;
    }
    if(section.length < 1){
        alert('لطفا بخش مربوط برای بررسی تیکت را انتخاب کنید.');
        return false;
    }
    if(message.length < 20){
        alert('پیام تیکت نباید از 20 کاراکتر کمتر باشد.');
        return false;
    }
    var info = [];
    jsonData['fa_title'] = title;
    jsonData['section'] = section;
    jsonData['_order'] = invoice;
    jsonData['message'] = message;
    jsonData['attache'] = [];
    attchaes = $('#ticketFiles a').length;
    x = 0;
    while(x < attchaes){
        src = $('#ticketFiles a').eq(x).attr('href');
        jsonData['attache'][x] = src;
        x++;
    }
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function registerTicketRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
            location.reload();
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function registerReturn(el){
    //Get information from form inputs
    var jsonData = {};
    path = '/tickets/ticket/';
    title = $('#subject').val();
    invoice = $('#invoice').val();
    _order = $('#invoice').val();
    orderItem = $('#item').val();
    message = $('#message').val();
    itemCount = $('#itemcount').val();
    if(title.length < 10){
        alert('عنوان تیکت نباید از 10 کاراکتر کمتر باشد.');
        return false;
    }
    if(section.length < 1){
        alert('لطفا بخش مربوط برای بررسی تیکت را انتخاب کنید.');
        return false;
    }
    if(message.length < 20){
        alert('پیام تیکت نباید از 20 کاراکتر کمتر باشد.');
        return false;
    }
    var info = [];
    jsonData['fa_title'] = title;
    jsonData['_order'] = invoice;
    jsonData['message'] = message;
    jsonData['_order'] = _order;
    jsonData['order_item'] = orderItem;
    jsonData['item_count'] = itemCount;
    jsonData['attache'] = [];
    attchaes = $('#ticketFiles a').length;
    if(attchaes != undefined){
        x = 0;
        while(x < attchaes){
            src = $('#ticketFiles a').eq(x).attr('href');
            jsonData['attache'][x] = src;
            x++;
        }
    }
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function registerReturnRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
            location.reload();
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}


function uploadProfilePictureProgress(loaded, position, total, lengthComputable){
    loader('show');
    if (lengthComputable) {
        loader('hide');
    }
}
function uploadProfilePicture(el, res){
    var res = JSON.parse(res);
    if(res['result'] == 'true'){
        $(el).attr('src', res['src']);
        $('.profile-photo-thumbnail').css('background', 'url('+res['src']+')');
    }
}

function uploadTicketFileProgress(loaded, position, total, lengthComputable){
    loader('show');
    if (lengthComputable) {
        loader('hide');
    }
}
function uploadTicketFile(el, res){
    var res = JSON.parse(res);
    if(res['result'] == 'true'){
        str = '<div class="callout success text-center small">\n' +
            '    <p href="http://google.com" style="width: calc(100% - 50px); padding-right: 10px; direction: ltr; text-align: right; margin: 0">\n' +
            '        <a target="_blank" href="'+res['src']+'">'+res['src']+'</a>\n' +
            '    </p>\n' +
            '    <button class="close-button" data-close="" aria-label="Close modal" type="button">\n' +
            '        <span aria-hidden="true" style="color: red">×</span>\n' +
            '    </button>\n' +
            '  </div>';
        $('#ticketFiles').append(str);
    }
}

/**
 * Fetch invoice item
 */
function getInvoiceItems(el){
    //Get information from form inputs
    var jsonData = {};
    var selector = $(el).val();
    path = '/profile/invoiceitems/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function getInvoiceItemsRes(res,params){
    var txt = '<option value="" selected="">انتخاب محصول مورد نظر</option>';
    res.forEach(looper);
    function looper(value, index, array) {
        txt += "<option value=\""+value['selector']+"\">"+value['title']+"</option>";
    }
    $('#item').html(txt);
}
/**
 * Send and manipulate comment
 */
function getInvoiceCount(el){
    //Get information from form inputs
    var jsonData = {};
    var selector = $(el).val();
    path = '/profile/invoiceitemscount/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function getInvoiceCountRes(res,params){
    var txt = '<option value="" selected="">تعداد کالا مرجوعی</option>';
    x = 0;
    while(x < res){
        x++;
        txt += '<option value="'+x+'">'+x+'</option>';
    }
    $('#itemcount').html(txt);
}

function pagination(el, pages, page) {
    conslode.log(pages);
    if(pages <= 1){
        return '';
    }
    str = '';
    if(page > 1){
        str += '<li page="'+(page - 1)+'" class="pagination-previous page-selector"><a class="paginate" href="1" aria-label="Next page">قبلی </a></li>';
    }else{
        str += '<li class="pagination-previous disabled">قبلی</li>';
    }
    if(pages < 7){
        x = 0;
        while(x < pages){
            x++;
            if(page == x){
                str += '<li><a page="'+x+'" href="#" class="page-selector current" aria-label="Page 2">'+x+'</a></li>';
            }else{
                str += '<li><a page="'+x+'" href="#" class="page-selector" aria-label="Page 2">'+x+'</a></li>';
            }
        }
    }else{
        x = 0;
        y = page - 3;
        if(y < 1){
            y = 0;
        }
        if((pages - y) < 5){
            y = page - 5;
        }
        if(y > 5){
            str += '<li><a page="1" href="#" class="page-selector" aria-label="Page 2">1</a></li>';
            str += '<li><a page="2" href="#" class="page-selector" aria-label="Page 2">2</a></li>';
            str += '<li class="ellipsis" aria-hidden="true"></li>';
        }
        while(x < 5){
            x++;
            y++;
            if(y > (pages-2)){break;}
            if(page == y){
                str += '<li><a page="'+y+'" href="#" class="page-selector current" aria-label="Page 2">'+y+'</a></li>';
            }else{
                str += '<li><a page="'+y+'" href="#" class="page-selector" aria-label="Page 2">'+y+'</a></li>';
            }
        }
        str += '<li class="ellipsis" aria-hidden="true"></li>';
        if((pages-1) == page){
            str += '<li><a href="#" class="page-selector current" aria-label="Page 2">'+(pages-1)+'</a></li>';
        }else{
            str += '<li><a page="'+(pages-1)+'" href="#" class="page-selector" aria-label="Page 2">'+(pages-1)+'</a></li>';
        }
        if(pages == page){
            str += '<li><a href="#" class="page-selector current" aria-label="Page 2">'+pages+'</a></li>';
        }else{
            str += '<li><a page="'+(pages-1)+'" href="#" class="page-selector" aria-label="Page 2">'+pages+'</a></li>';
        }
    }

    if(pages == page){
        str += '<li class="pagination-next disabled">بعدی</li>';
    }else{
        str += '<li page="'+(page + 1)+'" class="pagination-next page-selector"><a href="#" aria-label="Next page">بعدی </a></li>';
    }
    $('#'+el).html(str);
}

/**
 * Send and manipulate comment
 */
function ticketMessages(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).attr('selector');
    console.log(selector);
    path = '/tickets/messages/'+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function ticketMessagesRes(res,params){
    $('#ticket-messages').html(res);
}

/**
 * Send and manipulate comment
 */
function closeTicket(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).attr('selector');
    pathAddress = $(el).attr('path');
    path = pathAddress+selector;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function closeTicketRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
            item = $(params[0]).attr('item');
            $('#ticket-modal').hide(0);
            setTimeout(function(){ location.reload(); }, 500);
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}

/**
 * Send and manipulate comment
 */
function responseTicket(el){
    //Get information from form inputs
    var jsonData = {};
    selector = $(el).attr('selector');
    path = '/tickets/message/'+selector;
    message = $('#message-response').val();
    if(message.length < 20){
        alert('پیام تیکت نباید از 20 کاراکتر کمتر باشد.');
        return false;
    }
    jsonData['message'] = message;
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
}
function responseTicketRes(res,params){
    try {
        if(res['code'] == '1'){
            notify(res['message'], 'success');
            $('#ticket-modal').hide(0);
            setTimeout(function(){ location.reload(); }, 500);
        } else if(res['code'] == '10') {
            notify(res['message'], 'warning');
        } else {
            notify(res['message'], 'warning');
        }
    } catch (e) {
        notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
    }
}
