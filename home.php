<?php
  wp_register_script('home', get_template_directory_uri() . '/js/home.js', array( 'gsap', 'app' ), 1.1, false);
  wp_enqueue_script('home');
  get_header();
  $post = get_post(18);
  $pano = get_field('360_image');
?>

<img src="<?php echo $pano ?>" id="pano_src" style="display:none" />
<canvas id="pano"></canvas>

<?php
  wp_footer();
?>
