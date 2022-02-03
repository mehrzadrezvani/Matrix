var addPropertyMarkerLocation;
var coverRes = [];
var radioValue = 1;
var advanceSearch = false;

function logIn(el) {
  var jsonData = {}
  jsonData['username'] = $('#login-username').val();
  jsonData['password'] = $('#login-password').val();
  // jsonData['remember'] = '0'
  path = '/register/checkuser/';
  var info = [];
  info['url'] = path;
  info['information'] = jsonData;
  info['params'] = [el];
  return info;
}

function logInRes(res, params) {
  try {
    if (res['code'] === "0") {
      notify(res["message"]["message"], 'error');
    } else {
      notify(res["message"]["message"], 'success');
      window.location = '/dashboard';

    }
  } catch (e) {
    notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
  }
}

function signUp(el) {
  var jsonData = {}
  jsonData['username'] = $('#email-phone').val();
  jsonData['password'] = $('#password').val();
  if ($('#password').val() === $('#confirm-pass').val()) {
    path = '/register/do/';
    var info = [];
    info['url'] = path;
    info['information'] = jsonData;
    info['params'] = [el];
    return info;
  } else {
    notify('پسورد با تکرار آن مشابه نیست', 'error');
  }
}

function signUpRes(res, params) {
  try {
    if (res['code'] === "0") {
      notify(res["message"], 'error');
    } else if (res['code'] === "1") {
      notify(res["message"]["message"], 'success');
      window.location = '/dashboard';
    } else if (res['code'] === "2") {
      notify(res["message"], 'error');
    } else if (res['code'] === "3") {
      notify(res["message"], 'error');
    }
  } catch (e) {
    notify('متاسفانه در ثبت درخواست شما مشکلی ایجاد شد.', 'warning');
  }
}

function uploadCoverProgress(loaded, position, total, lengthComputable) {
  loader('show');
  if (lengthComputable) {
    loader('hide');
  }
}

function uploadCover(el, res) {
  console.log(res);
  var res = JSON.parse(res);
  if (res['result'] == 'true') {
    // $(el).attr('src', res['src']);
    // $('.profile-photo-thumbnail').css('background', 'url(' + res['src'] + ')');
    notify(res["message"], 'success');
    coverRes.push(res['src']);
  }
}

function uploadCover2(el, res) {
  console.log(res);
  var res = JSON.parse(res);
  if (res['result'] == 'true') {
    // $(el).attr('src', res['src']);
    // $('.profile-photo-thumbnail').css('background', 'url(' + res['src'] + ')');
    notify(res["message"], 'success');
    coverRes.push(res['src']);
  }
}

function uploadCover3(el, res) {
  console.log(res);
  var res = JSON.parse(res);
  if (res['result'] == 'true') {
    // $(el).attr('src', res['src']);
    // $('.profile-photo-thumbnail').css('background', 'url(' + res['src'] + ')');
    notify(res["message"], 'success');
    coverRes.push(res['src']);
  }
}

/**
 * Send and manipulate comment
 */
function getCities(el) {
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

function getCitiesRes(res, params) {
  if (params == undefined) {
    nextValue = $('#up_state').attr('next-value');
  } else {
    nextValue = $(params[0]).attr('next-value');
  }

  var txt = '<option value="">شهر</option>';
  res.forEach(looper);

  function looper(value, index, array) {
    selected = '';
    if (nextValue == value['id']) {
      selected = 'selected';
    } else {
      selected = '';
    }
    txt += "<option value=\"" + value['id'] + "\" " + selected + ">" + value['city'] + "</option>";
  }
  $('#city').html(txt);
}

/**
 * Send and manipulate comment
 */
function getArea(el) {
  //Get information from form inputs
  var jsonData = {};
  jsonData['city'] = $(el).val();
  path = '/addresses/area/';
  var info = [];
  info['url'] = path;
  info['information'] = jsonData;
  info['params'] = [el];
  return info;
}

function getAreaRes(res, params) {
  var txt = '<option value="">منطقه</option>';
  res.forEach(looper);

  function looper(value, index, array) {
    selected = '';
    if (nextValue == value['id']) {
      selected = 'selected';
    } else {
      selected = '';
    }
    txt += "<option value=\"" + value['id'] + "\" " + selected + ">" + value['area'] + "</option>";
  }
  $('#areaSelect').html(txt);
}
/* sends contact forms */
function contact(el) {
  var jsonData = {}
  jsonData['full_name'] = $('#contactFullname').val();
  jsonData['subject'] = $('#contactSubject').val();
  jsonData['email'] = $('#contactEmail').val();
  jsonData['phone'] = $('#contactPhone').val();
  jsonData['message'] = $('#contactMessage').val();

  path = '/contact/message/';
  var info = [];
  info['url'] = path;
  info['information'] = jsonData;
  info['params'] = [el];
  return info;
}

function contactRes(res, params) {
  console.log(res);
  if (res['result'] == 'false') {
    notify(res["message"], 'error')
  }
  if (res['result'] == 'true') {
    $('#contactForm .forms').slideUp(700).delay(500);
    $('#contactFormMessage').delay(500).slideDown(700);
    $('.messageContainer').html(res["message"]);
    // notify(res["message"], "success");
  }
}

/* sends realsating forms */
function realstating(el) {
  var jsonData = {}
  jsonData['title'] = $('#realstateName').val();
  jsonData['address'] = $('#realstateAddress').val();
  jsonData['email'] = $('#contactEmail').val();
  jsonData['phone'] = $('#realstatePhone').val();
  jsonData['mobile'] = $('#realstatemobile').val();
  jsonData['cetificate_number'] = $('#certificateNumber').val();
  jsonData['full_name'] = $('#fullName').val();

  path = '/dashboard/converttorealstate/';
  var info = [];
  info['url'] = path;
  info['information'] = jsonData;
  info['params'] = [el];
  return info;
}

function realstatingRes(res, params) {
  console.log(res);
  if (res['result'] == 'false') {
    notify(res["message"], 'error')
  }
  if (res['result'] == 'true') {
    $('#contactForm .forms').slideUp(700).delay(500);
    $('#contactFormMessage').delay(500).slideDown(700);
    $('.messageContainer').html(res["message"]);
    // notify(res["message"], "success");
  }
}

/* sends update informations */
function updateInformation(el) {
  var jsonData = {}
  jsonData['first_name'] = $('#updateFirstName').val();
  jsonData['last_name'] = $('#updateLastName').val();
  jsonData['melli'] = $('#updateSSN').val();
  jsonData['email'] = $('#updateEmail').val();
  jsonData['phone'] = $('#updatePhone').val();
  jsonData['postal'] = $('#updatePostalcode').val();
  jsonData['state'] = $('#state').val();
  jsonData['city'] = $('#city').val();
  jsonData['address'] = $('#updateAddress').val();

  console.log(jsonData);
  path = '/dashboard/user/';
  var info = [];
  info['url'] = path;
  info['information'] = jsonData;
  info['params'] = [el];
  return info;
}

function updateInformationRes(res, params) {
  console.log(res);
  if (res['result'] == 'false') {
    notify(res["message"], 'error')
  }
  if (res['result'] == 'true') {
    notify(res["message"], "success");
  }
}

function like(el) {
  var jsonData = {}
  jsonData['model'] = "Property";
  jsonData['selector'] = propertySelector;

  console.log(jsonData);
  path = '/likes/like/';
  var info = [];
  info['url'] = path;
  info['information'] = jsonData;
  info['params'] = [el];
  return info;
}

function likeRes(res, params) {
  console.log(res);
  if (res['result'] == 'false') {
    notify(res["message"], 'error')
  }
  if (res['result'] == 'true') {
    notify(res["message"], "success");
  }
}

/* sends updatepassword informations */
function passwordChange(el) {
  var jsonData = {}
  jsonData['current_password'] = $('#current_password').val();
  if ($('#newPassword').val() === $('#newPasswordConfirm').val()) {
    jsonData['password'] = $('##newPassword').val();
  } else {
    notify('رمز عبور با تکرار آن یکسان نیست', 'error');
  }

  path = '/dashboard/security/';
  var info = [];
  info['url'] = path;
  info['information'] = jsonData;
  info['params'] = [el];
  return info;
}

function passwordChangeRes(res, params) {
  console.log(res);
  if (res['result'] == 'true') {
    notify(res["message"], "success");
  }
}

function addProperty(el) {
  var jsonData = {}
  jsonData['title'] = $('#propertyName').val();
  jsonData['type'] = $('#type').val();
  jsonData['square_meters'] = $('#square_meters').val();
  jsonData['area'] = $('#areaSelect').val();
  jsonData['bedrooms'] = $('#bedrooms').val();
  jsonData['parking'] = $('#parkings').val();
  jsonData['warehouse'] = $('#warehouse').val();
  jsonData['yard_garden'] = $('#fields').val();
  jsonData['wc'] = $('#wc').val();
  jsonData['year'] = $('#year').val();
  jsonData['state'] = $('#state').val();
  jsonData['city'] = $('#city').val();
  jsonData['avenue'] = $('#avenue').val();
  jsonData['category'] = $('#category').val();
  jsonData['address'] = $('#address').val();
  jsonData['postal'] = $('#postal').val();
  jsonData['cost'] = $('#cost').val();
  jsonData['deposit'] = $('#deposit').val();
  jsonData['perMonth'] = $('#perMonth').val();
  jsonData['kind'] = radioValue;
  jsonData['cover'] = coverRes;
  jsonData['description'] = $('#addPropertyDescription').val();
  var str = JSON.stringify(addPropertyMarkerLocation);
  console.log(str);
  jsonData['location'] = str;

  path = '/properties/property/';
  var info = [];
  info['url'] = path;
  info['information'] = jsonData;
  info['params'] = [el];
  console.log(info);
  return info;
}

function addPropertyRes(res, params) {
  console.log(res);
  if (res['result'] == 'false') {
    notify(res["message"], 'error')
  }
  if (res['result'] == 'true') {
    notify(res["message"], "success");
    window.location = '/dashboard';

  }
}



function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      str = '<div class="image" id ="image-bg" style="background-image: url(\'' + e.target.result + '\');"><div class="close"></div></div>'
      $('#uploadedImage').css('background-image', 'url(' + e.target.result + ')');
      $('#imagesList').append(str);
      $('#context').fadeOut(500).delay(5500);
      setTimeout(function () {
        $('#uploadedImage').css('background-image', 'url()');
      }, 6000);
      $('#context').fadeIn(300);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
var addPropertyMap;

function mapMake(id) {
  addPropertyMap = new L.Map(id, {
    key: 'web.oXPXaz1ePdHUgytpywnbdd47TZFkmdDKbsIl2KzS',
    maptype: 'dreamy',
    poi: true,
    traffic: false,
    center: [35.699739, 51.338097],
    zoom: 14
  });
}

function filtering() {
  x = 0;
  y = 0;
  z = 0;
  i = 0;
  j = 0;
  w = 0;
  filterString = "";
  typefilterCont = $('.typefilter .item.active').length;
  typefilter = $('.typefilter .item.active p');

  kindfilterCont = $('.kindfilter .item.active').length;
  kindfilter = $('.kindfilter .item.active p');

  bedsfilterCont = $('.bedsfilter .item.active').length;
  bedsfilter = $('.bedsfilter .item.active p');

  wcfilterCont = $('.wcfilter .item.active').length;
  wcfilter = $('.wcfilter .item.active p');

  parkingfilterCont = $('.parkingfilter .item.active').length;
  parkingfilter = $('.parkingfilter .item.active p');

  yardgardenfilterCont = $('.yard-gardenfilter .item.active').length;
  yardgardenfilter = $('.yard-gardenfilter .item.active p');

  prefix = "";

  while (x < typefilterCont) {
    value = typefilter.eq(x).html();
    filterString += prefix + "type[]=" + value;
    prefix = "&";
    x++;
  }

  while (y < kindfilterCont) {
    value = kindfilter.eq(y).html();
    filterString += prefix + "kind[]=" + value;
    prefix = "&";
    y++;
  }

  while (z < bedsfilterCont) {
    value = bedsfilter.eq(z).html();
    filterString += prefix + "beds[]=" + value;
    prefix = "&";
    z++;
  }

  while (i < wcfilterCont) {
    value = wcfilter.eq(i).html();
    filterString += prefix + "wc[]=" + value;
    prefix = "&";
    i++;
  }

  while (j < parkingfilterCont) {
    value = parkingfilter.eq(j).html();
    filterString += prefix + "parking[]=" + value;
    prefix = "&";
    j++;
  }

  while (w < yardgardenfilterCont) {
    value = yardgardenfilter.eq(w).html();
    filterString += prefix + "yard-garden[]=" + value;
    prefix = "&";
    w++;
  }
  console.log(filterString);
}

$(document).ready(function () {
  $('#sliders').owlCarousel({
    loop: true,
    slideSpeed: 300,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    navSpeed: 1000,
    singleItem: true,
    items: 1,
    stagePadding: 0,
    margin: 15,
    nav: false,
    rewindSpeed: 500,
    dots: true,
    rtl: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      960: {
        items: 1
      }
    }
  });
  $('#relatedSlider').owlCarousel({
    loop: true,
    slideSpeed: 300,
    navSpeed: 1000,
    singleItem: true,
    // items: 4,
    stagePadding: 0,
    margin: 15,
    nav: true,
    rtl: true,
    navText: ['<span class="icon-Next"></span>', '<span class="icon-Prev"></span>'],
    rewindSpeed: 500,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        itmes: 1
      },
      900: {
        items: 3
      },
      1000: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });

  $('#propertySlider').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 20,
    rtl: true,
    width: 100,
    nav: true,
    navText: ['<span class="icon-Next"></span>', '<span class="icon-Prev"></span>'],
    responsive: {
      0: {
        items: 1
      },
      800: {
        items: 1
      },
      1000: {
        items: 2
      }
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var stickymenu = document.getElementById("fixedmenu");
    var stickymenuoffset = stickymenu.offsetTop;

    window.addEventListener("scroll", function (e) {
      requestAnimationFrame(function () {
        if (window.pageYOffset > stickymenuoffset) {
          stickymenu.classList.add('sticky');
        } else {
          stickymenu.classList.remove('sticky');
        }
      })
    });
  });


  $(".header > .row .logo .burger__button").on("click", function () {
    $(".header > .row .nav .menu").toggleClass("active");
  });

  $('.heroCont .container .title > .item').on('click', function () {
    if ($('.heroCont .container .title > .item').has('active')) {
      $('.heroCont .container .title > .item ').removeClass('active').addClass('deactive');
      $('#renting-section-category').removeClass('show');
      $('#selling-section-category').removeClass('show');
    }
    $('.' + $(this).attr('data-src')).removeClass('deactive').addClass('active');
    $('#' + $(this).attr('value')).addClass('show');
  });



  $('.heroCont .container .searchContainer .cont .advanced-search').on('click', function () {
    $(this).next().fadeIn();
    $(this).next().next().fadeIn();
  });

  $('#closeAdvacned').on('click', function () {
    $('#filters').fadeOut();
    $('#filtersContainer').fadeOut();
  });

  $('#filtersContainer').on('click', function () {
    $('#filters').fadeOut();
    $('#filtersContainer').fadeOut();
  });


  $('#changePlace').on('click', function () {
    $(this).next().removeClass('hide').addClass('show').fadeIn();
    $(this).next().next().removeClass('hide').addClass('show').next().fadeIn();
  });

  $('#changePlace2').on('click', function () {
    $(this).next().removeClass('hide').addClass('show').fadeIn();
    $(this).next().next().removeClass('hide').addClass('show').fadeIn();
  });

  $('#calls').on('click', function () {
    $(this).next().fadeIn();
    $(this).next().next().fadeIn();
  });

  $('#closeChange').on('click', function () {
    $('#overlay').removeClass('show').addClass('hide').fadeOut();
    $('#selectState').removeClass('show').addClass('hide').fadeOut();
  });

  $('#overlay').on('click', function () {
    $('#overlay').removeClass('show').addClass('hide').fadeOut();
    $('#selectState').removeClass('show').addClass('hide').fadeOut();
  });
  $('#overlay2').on('click', function () {
    $('#overlay2').removeClass('show').addClass('hide').fadeOut();
    $('#selectState2').removeClass('show').addClass('hide').fadeOut();
  });

  $('#closeChange2').on('click', function () {
    $('#overlay2').removeClass('show').addClass('hide').fadeOut();
    $('#selectState2').removeClass('show').addClass('hide').fadeOut();
  });

  $('#closeChange3').on('click', function () {
    $('#overlay3').fadeOut();
    $('#call').fadeOut();
  });

  $('#filters .filter .items .item').on('click', function () {
    $(this).toggleClass('active');
  });
  $('.heroCont .container .searchContainer .cont .categories .category .dropdown p').on('click', function () {
    $('#' + $(this).attr('value')).html($(this).html());
  });
  $('.categories .category .context').on('click', function () {
    $(this).toggleClass('active');
    $('#' + $(this).attr('value')).slideToggle();
  });

  $('.itemsContainer .container .filters .content .filter .items .input').on('click', function () {
    $(this).toggleClass('active');
  });

  $('.itemsContainer .row .filters .filter >.content').on('click', function () {
    $(this).toggleClass('active');
    $('#' + $(this).attr('value')).slideToggle();
  });

  $('.container .login .password .icon').on('click', function () {
    if ($('.container .login .password').hasClass('hovered')) {
      $(this).find("span").remove();
      $(this).append('<span class="icon-pass-eye-shut"></span>').fadeIn(800);
      $(this).parent().removeClass('hovered');
      $('.container .login .password input').delay(500).attr('type', 'password');


    } else {
      $(this).find("span").remove();
      $(this).append('<span class="icon-pass-eye-open"></span>').fadeIn(800);
      $('.icon-pass-eye-open').css({
        'color': '#4720E2',
        'font-size': '2rem',
        'top': '50%',
        'transform': 'translateY(-50%)'
      });
      $(this).parent().addClass('hovered');
      $('.container .login .password input').delay(500).attr('type', 'text');
    }
  });

  $('.container .login .inputs .links #forgot-password').on('click', function () {
    $('#login-section').slideUp(500);
    $('#signUp-section').slideUp(500);
    $('#forgot-password-section').delay(600).fadeIn(500);
  });
  $('.container .login .inputs .links #login').on('click', function () {
    $('#forgot-password-section').slideUp(500);
    $('#signUp-section').slideUp(500);
    $('#login-section').delay(600).fadeIn(500);
  })

  $('.container .login .inputs .links #signUp').on('click', function () {
    $('#login-section').slideUp(500);
    $('#forgot-password-section').slideUp(500);
    $('#signUp-section').delay(600).fadeIn(500);
  });

  $('.container .login .inputs #generateCode').on('click', function () {
    $('#forgot-password-section').slideUp(500);
    $('.addGeneratedPasscode').css("display", "flex").hide().delay(600).fadeIn(500);
  });

  $('.userProfile .row .userActionListContainer .userActionList .userAction').on('click', function () {
    if ($('.userProfile .row .userActionListContainer .userActionList .userAction').has('active')) {
      $('.userProfile .row .userActionListContainer .userActionList .userAction').removeClass('active');
    }
    $(this).addClass('active');
    if ($('.userProfile .row .tabs .tab').has('active')) {
      $('.userProfile .row .tabs .tab').removeClass('active');
    }
    $('#' + $(this).attr('data-src')).addClass('active');
  });

  $('.propertyInputs .row .propertyType .input').on('click', function () {
    if ($('.propertyInputs .row .propertyType .input').has('active')) {
      $('.propertyInputs .row .propertyType .input').removeClass('active');
      $('.propertyInputs .row .propertyType input[name=kind]').prop("checked", false);
    }
    $(this).addClass('active');
    $('#' + $(this).attr('value')).prop('checked', true);
    radioValue = $('#' + $(this).attr('value') + ':checked').val()
    $('.propertyInputs .row .prices .sale').addClass('hide');
    $('.propertyInputs .row .prices .rent').addClass('hide');
    $('.propertyInputs .row .prices .' + $(this).attr('value')).removeClass('hide')

    // if ($('.propertyInputs .row .propertyType input[type=radio]:checked').prop('checked') == true) {
    // console.log("done");
    // }
  });


  $('#like').on('click', function () {
    $(this).toggleClass('icon-icons-like-dark').toggleClass('icon-like-fill');
  });


  $('#uploadPics').on('click', function () {
    $('#propertyPics').trigger('click');
  });
  $('#uploadPics2').on('click', function () {
    $('#propertyPics2').trigger('click');
  });
  $('#uploadPics3').on('click', function () {
    $('#propertyPics3').trigger('click');
  });

  $('#propertyPics').change(function () {
    readURL(this);
  });

  $('#propertyPics2').change(function () {
    readURL(this);
  });

  $('.heroCont .container .searchContainer .cont #filters .filter .title').on('click', function () {
    console.log();
    $('.heroCont .container .searchContainer .cont #filters .filter .title').removeClass('active');
    $('.heroCont .container .searchContainer .cont #filters .filter .items').slideUp();
    $(this).addClass('active');
    $(this).next().delay(300).removeClass('hide').hide().slideDown(500);
  });

  $('body').on('click', '.close', function () {
    $(this).parent().remove();
    // coverRes.indexOf($(this).parent().css('background-image'))
    var bg = $(this).parent().css('background-image');
    bg = bg.replace('url(', '').replace(')', '');
    console.log(bg);
  });

  var bongaMarker = L.icon({
    iconUrl: '/temp-web/assets/images/mappin.svg',
    iconAnchor: [25, 60]
  });

  mapMake("addPropertyMap");
  var marker = L.marker();

  function onMapClick(e) {
    addPropertyMarkerLocation = e.latlng;
    marker.setLatLng(e.latlng).addTo(addPropertyMap);
  }
  addPropertyMap.scrollWheelZoom.disable();
  addPropertyMap.on('click', onMapClick);
});