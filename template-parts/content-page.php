<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package om
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="entry-content">
		<?php
			the_content();

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'om' ),
				'after'  => '</div>',
			) );

			if (have_rows('content')) :
			  $slide_count = 0;
			  while (have_rows('content')) : the_row();
			  	$title = get_sub_field('title');
			  	$body = get_sub_field('body');
			  ?>
			  <?php if ($title) { ?>
					<h1 class="text-center title uppercase"><?php echo $title ?></h1>
		  	<?php } ?>
  		  <?php if ($body) { ?>
  				<span class="block body"><?php echo $body ?></span>
  	  	<?php } ?>
			  <?
			  endwhile;
			endif;
		?>
	</div><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->
