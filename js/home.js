var Pano = function(canvas, img_uri) {
  // Context
  this.canvas = canvas
  this.parent = canvas.parentElement
  this.ctx = canvas.getContext('2d')
  this.src = document.createElement('img')
  this.ptrn = null
  this.panoOffset = 0
  this.panoHeight = 0
  this.panoWidth = 0
  this.now = Date.now()
  this.then = this.now
  this.delta = this.now - this.then
  this.speed = 60
  this.velocity = this.speed * this.delta
  this.friction = 1000
  this.lerp = null
  this.inputStart = {x: 0, y: 0}
  this.currentInput = {x: 0, y: 0}
  this.inputEnd = this.currentInput

  // Sizing
  this.resize = function() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.panoHeight = this.canvas.height
    this.panoWidth = this.src.width * this.panoHeight / this.src.height
  }.bind(this)
  window.addEventListener('resize', function(e) {
    this.resize()
  }.bind(this))

  // Image
  this.src.addEventListener('load', function() {
    this.pattern = this.ctx.createPattern(this.src, 'repeat')
    this.resize()
    this.frame = window.requestAnimationFrame(this.run)
  }.bind(this))
  this.src.addEventListener('error', function() {
    this.abort()
  }.bind(this))
  this.src.src = img_uri

  // Rendering
  this.draw = function() {
    this.ctx.drawImage(
      this.src,
      this.panoOffset,
      0,
      this.panoWidth,
      this.panoHeight
    )
    if (this.panoOffset > 0) {
      this.ctx.drawImage(
        this.src,
        this.panoOffset - this.panoWidth,
        0,
        this.panoWidth,
        this.panoHeight
      )
    }
    if (this.panoOffset < this.panoWidth + this.canvas.width) {
      this.ctx.drawImage(
        this.src,
        this.panoOffset + this.panoWidth,
        0,
        this.panoWidth,
        this.panoHeight
      )
    }
    this.update()
  }.bind(this)
  this.update = function() {
    this.velocity = this.speed * this.delta
    this.panoOffset -= this.velocity
    if (this.panoOffset < -(this.panoWidth + this.canvas.width)) {
      this.panoOffset += this.panoWidth
    }
    if (this.panoOffset > this.panoWidth - this.canvas.width) {
      this.panoOffset -= this.panoWidth
    }
  }.bind(this)


  // Input
  this.lerpSpeed = function() {
    if (this.speed < 0) {
      this.speed = Math.min(this.speed + this.delta * this.friction, 0)
      return this.lerp = window.requestAnimationFrame(this.lerpSpeed)
    } else if (this.speed > 0) {
      this.speed = Math.max(this.speed - this.delta * this.friction, 0)
      return this.lerp = window.requestAnimationFrame(this.lerpSpeed)
    }
  }.bind(this)

  this.handleMouseInputStart = function(e) {
    this.speed = 0
    this.currentInput.x = e.clientX
    this.inputStart.x = e.clientX
    this.parent.removeEventListener('mousedown', this.handleMouseInputStart)
    this.parent.addEventListener('mousemove', this.handleMouseDrag)
    window.addEventListener('mouseup', this.handleMouseInputEnd)
  }.bind(this)
  this.handleMouseDrag = function(e) {
    // window.cancelAnimationFrame(this.lerp)
    // this.lerpSpeed((this.currentInput.x - e.clientX) * 60)
    // this.currentInput.x = e.clientX

    this.speed = (this.currentInput.x - e.clientX) * 60
    this.currentInput.x = e.clientX
  }.bind(this)
  this.handleMouseInputEnd = function(e) {
    this.inputEnd.x = this.currentInput.x
    this.speed = (this.inputStart.x - this.inputEnd.x) * 10
    this.parent.removeEventListener('mousemove', this.handleMouseDrag)
    window.removeEventListener('mouseup', this.handleMouseInputEnd)
    this.parent.addEventListener('mousedown', this.handleMouseInputStart)
    this.lerpSpeed()
  }.bind(this)

  this.handleTouchInputStart = function(e) {
    this.speed = 0
    this.currentInput.x = e.targetTouches['0'].clientX
    this.inputStart.x = e.targetTouches['0'].clientX
    this.parent.removeEventListener('touchstart', this.handleTouchInputStart)
    this.parent.addEventListener('touchmove', this.handleTouchDrag)
    window.addEventListener('touchend', this.handleTouchInputEnd)
  }.bind(this)
  this.handleTouchDrag = function(e) {
    this.speed = (this.currentInput.x - e.targetTouches['0'].clientX) * 60
    this.currentInput.x = e.targetTouches['0'].clientX
  }.bind(this)
  this.handleTouchInputEnd = function(e) {
    this.inputEnd.x = this.currentInput.x
    this.speed = (this.inputStart.x - this.inputEnd.x) * 10
    this.parent.removeEventListener('touchmove', this.handleTouchDrag)
    window.removeEventListener('touchend', this.handleTouchInputEnd)
    this.parent.addEventListener('touchstart', this.handleTouchInputStart)
    this.lerpSpeed()
  }.bind(this)

  this.parent.addEventListener('mousedown', this.handleMouseInputStart)
  this.parent.addEventListener('touchstart', this.handleTouchInputStart)


  // Running
  this.time = function() {
    this.now = Date.now()
    this.delta = (this.now - this.then) / 1000
    this.then = this.now
  }.bind(this)
  this.run = function() {
    this.draw()
    this.time()
    this.frame = window.requestAnimationFrame(this.run)
  }.bind(this)
  this.abort = function() {
    window.cancelAnimationFrame(this.frame)
    this.canvas.style.backgroundImage = 'url('+img_uri+')'
  }.bind(this)
}

$(document).ready(function() {
  var pano_src = document.getElementById('pano_src').src

  var $tag,
      $title,
      $cta,
      $info

  $tag = $('.tag')
  $title = $('.tag .title')
  $cta = $('.tag .cta')
  $info = $('.tag .info')

  $title.css('opacity', 0)
  $cta.css('opacity', 0)
  $info.css('opacity', 0)

  var init = function() {
    var pano = new Pano(
      document.getElementById('pano'),
      pano_src
    )

    TweenLite.to($title, 0.33, {
      autoAlpha: 1,
      delay: 0
    })
    TweenLite.to($cta, 0.33, {
      autoAlpha: 1,
      delay: 0.33
    })
    TweenLite.to($info, 0.33, {
      autoAlpha: 1,
      delay: 0.66
    })

    $('body.home').addClass('loaded')
  }

  var preload = document.createElement('img')
  preload.addEventListener('load', init)
  // preload.addEventListener('error', init) // should i shouldnt i...
  preload.src = pano_src
})
