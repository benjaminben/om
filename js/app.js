window.$ = window.jQuery

$(document).ready(function() {
  console.log("mom")
  var $masthead = $('#masthead')
  var $burger = $masthead.find(".burger")

  $burger.on('click', function(e) {
    $masthead.toggleClass('active')
  })
})
