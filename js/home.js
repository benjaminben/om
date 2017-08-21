var Pano = function(canvas, img_uri) {
  // Context
  this.canvas = canvas
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
    this.panoOffset += this.velocity
    if (this.panoOffset < -(this.panoWidth + this.canvas.width)) {
      this.panoOffset += this.panoWidth
    }
    if (this.panoOffset > this.panoWidth - this.canvas.width) {
      this.panoOffset -= this.panoWidth
    }
  }.bind(this)

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
  console.log('home')
  var pano = new Pano(
    document.getElementById('pano'),
    document.getElementById('pano_src').src
  )
})
