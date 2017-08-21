<?php
  wp_register_script('home', get_template_directory_uri() . '/js/home.js', array( 'gsap', 'app' ), 1.1, false);
  wp_enqueue_script('home');
  get_header();
  $post = get_post(18);
  $pano = get_field('360_image');
?>

<img src="<?php echo $pano ?>" id="pano_src" style="display:none" />
<canvas id="pano"></canvas>

<div class="tag table">
  <span class="table-cell v-middle relative">
    <h1 class="title">&ldquo;You Shine<br>I Shine&rdquo;</h1>
    <a class="cta inline-block v-middle relative" href="about">Learn More</a>
    <span class="info inline-block v-top uppercase">
      Wednesdays, 7:30pm<br>
      <a target="_blank" href="https://www.instagram.com/thegreatcompany/">
        @thegreatcompany
      </a>
    </span>
  </span>
</div>

<?php
  wp_footer();
?>
