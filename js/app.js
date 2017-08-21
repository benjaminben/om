window.$ = window.jQuery
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame
window.cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame

$(document).ready(function() {
  console.log("wtfffff")
  var $masthead = $('#masthead')
  var $burger = $masthead.find(".burger")

  $burger.on('click', function(e) {
    $masthead.toggleClass('active')
  })
})
