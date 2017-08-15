<?php
  wp_register_script('home', get_template_directory_uri() . '/js/home.js', array( 'gsap', 'app' ), 1.1, false);
  wp_enqueue_script('home');
  get_header();
?>
