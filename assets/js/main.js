/**
* Template Name: UpConstruction
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });
  
  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});


// Function to handle scroll event
function handleScroll() {
  const header = document.getElementById('header');
  const headerHeight = header.offsetHeight; // Height of the header

  // Check scroll position to determine the class addition/removal
  if (window.scrollY > headerHeight) {
    header.classList.add('header-scrolled');
    document.body.style.paddingTop = headerHeight + 'px'; // Maintain original document flow
  } else {
    header.classList.remove('header-scrolled');
    document.body.style.paddingTop = '0'; // Reset padding
  }
}

// Add a scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial check on page load
window.addEventListener('load', handleScroll);





$(document).ready(function () {
  var current_fs, next_fs, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var selectedCard = null; // Variable to track selected card
  
  setProgressBar(current);

  // Function to handle card selection
  function selectCard(card) {
    if (selectedCard) {
      selectedCard.removeClass('selected');
    }
    selectedCard = $(`.card2[onclick="selectCard('${card}')"]`);
    selectedCard.addClass('selected');
  }

  // Event handler for card selection
  $('.card2').click(function() {
    var cardType = $(this).attr('onclick').match(/'([^']+)'/)[1];
    selectCard(cardType);
  });

  $(".next").click(function(){
    if (current === 1) {
      // If on the first step (card selection), only proceed if a card is selected
      if (!selectedCard) {
        alert('Please select a card type to continue.');
        return;
      }
    } else {
      // For other steps, proceed with field validations
      current_fs = $(this).parent();
      var isValid = validateFields(current_fs);
      if (!isValid) {
        return;
      }
    }
    
    // Move to the next fieldset if all validations pass
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    // Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    // Show the next fieldset
    next_fs.show(); 
    
    // Hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now) {
        // For making fieldset appear animation
        opacity = 1 - now;
  
        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        next_fs.css({'opacity': opacity});
      }, 
      duration: 500
    });
    setProgressBar(++current);
  });

  $(".previous").click(function(){
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    $("#progressbar li").eq(current).removeClass("active");
    previous_fs.show();
    current_fs.animate({opacity: 0}, {
      step: function(now) {
        opacity = 1 - now;
        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        previous_fs.css({'opacity': opacity});
      }, 
      duration: 500
    });
    setProgressBar(--current);
  });

  function setProgressBar(curStep){
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width",percent+"%");
  }

  function validateFields(current_fs) {
    // Perform field validations based on the current fieldset
    if (current === 2) {
      var cardholderName = current_fs.find('input[name="name"]').val();
      if (!cardholderName.match(/^[A-Za-z]+$/)) {
        showError(current_fs.find('input[name="name"]'), 'Cardholder Name should contain only text.');
        return false;
      } else {
        hideError(current_fs.find('input[name="name"]'));
      }

      var email = current_fs.find('input[name="email"]').val();
      if (!validateEmail(email)) {
        showError(current_fs.find('input[name="email"]'), 'Please enter a valid email address.');
        return false;
      } else {
        hideError(current_fs.find('input[name="email"]'));
      }

      var phno = current_fs.find('input[name="phno"]').val();
      if (!phno.match(/^\d{10}$/)) {
        showError(current_fs.find('input[name="phno"]'), 'Contact Number should be a 10-digit number.');
        return false;
      } else {
        hideError(current_fs.find('input[name="phno"]'));
      }

      var idType = current_fs.find('select[name="id-type"]').val();
      if (idType === '#') {
        showError(current_fs.find('select[name="id-type"]'), 'Please select an ID Type.');
        return false;
      } else {
        hideError(current_fs.find('select[name="id-type"]'));
      }

      var idPassportNo = current_fs.find('input[name="id-passport-no"]').val();
      var maxIdLength = idType === 'national-id' ? 8 : 12;
      if (!idPassportNo.match(/^\d+$/) || idPassportNo.length !== maxIdLength) {
        showError(current_fs.find('input[name="id-passport-no"]'), 'ID/Passport Number should contain only numerical characters and should be ' + maxIdLength + ' digits for ' + idType.toUpperCase() + '.');
        return false;
      } else {
        hideError(current_fs.find('input[name="id-passport-no"]'));
      }

      var product = current_fs.find('select[name="product"]').val();
      if (product === '#') {
        showError(current_fs.find('select[name="product"]'), 'Please select a product.');
        return false;
      } else {
        hideError(current_fs.find('select[name="product"]'));
      }

      var pickupLocation = current_fs.find('select[name="pickup-location"]').val();
      if (pickupLocation === '#') {
        showError(current_fs.find('select[name="pickup-location"]'), 'Please select a pick-up location.');
        return false;
      } else {
        hideError(current_fs.find('select[name="pickup-location"]'));
      }
        
      // Additional validations for the second fieldset
      // ...
    } else if (current === 3) {
      // For the third step (summary step)
      function displaySummary() {
        var cardholderName = current_fs.find('input[name="name"]').val();
        var email = current_fs.find('input[name="email"]').val();
        var phno = current_fs.find('input[name="phno"]').val();
        var idType = current_fs.find('select[name="id-type"]').val();
        var idPassportNo = current_fs.find('input[name="id-passport-no"]').val();
        var product = current_fs.find('select[name="product"]').val();
        var pickupLocation = current_fs.find('select[name="pickup-location"]').val();

        // Console logs to check the fetched values
        console.log('Cardholder Name:', cardholderName);
        console.log('Email:', email);
        console.log('Contact Number:', phno);
        console.log('ID Type:', idType);
        console.log('ID/Passport Number:', idPassportNo);
        console.log('Product:', product);
        console.log('Pickup Location:', pickupLocation);

        // Display summary in the third fieldset
        $("#summary-cardholder-name").text("Cardholder Name: " + cardholderName);
        $("#summary-email").text("Email: " + email);
        $("#summary-phno").text("Contact Number: " + phno);
        $("#summary-id-type").text("ID Type: " + idType);
        $("#summary-id-passport-no").text("ID/Passport Number: " + idPassportNo);
        $("#summary-product").text("Product: " + product);
        $("#summary-pickup-location").text("Pickup Location: " + pickupLocation);
        // Add other summary elements similarly for the remaining details
      }
      
      // Call the function to display the summary details
      displaySummary();

    } // Add additional validations for other steps if needed

    return true;
  }

  function validateEmail(email) {
    // Basic email validation regex
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function showError(element, message) {
    // Show error message below the input field
    element.addClass('error');
    element.parent().append('<span class="error-message" style="color: red;">' + message + '</span>');
  }

  function hideError(element) {
    // Remove error message and error class
    element.removeClass('error');
    element.parent().find('.error-message').remove();
  }
});


