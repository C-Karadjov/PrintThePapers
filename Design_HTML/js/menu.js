/* globals $ */
$(() => {
  $('#main-nav a').click(() => {
    $('.mega-menu:not([data-menu=\'' + $(this).data('menu') + '\'])')
      .each(() => {
        if ($(this).is(':visible')) {
          $(this).slideToggle(500);
        }
      });
    $('.mega-menu[data-menu=\'' + $(this)
      .data('menu') + '\']')
      .slideToggle(500);
  });

  $('.close-menu').click(() => {
    $('.mega-menu:visible').slideToggle(500);
  });

  $('#responsive-menu-button').click(() => {
    $('#responsive-menu').slideToggle(500);
  });
});
