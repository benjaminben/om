<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package om
 */

	$socialargs = [
		'post_type' => 'social',
		'p'         => 45
	];

	$sq = new WP_Query($socialargs);

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'om' ); ?></a>

	<header id="masthead">
		<?php
			if( has_custom_logo() ) {
				the_custom_logo();
			} else { ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<h1 class="site-root-link">
						<?php bloginfo( 'name' ); ?>
					</h1>
				</a>
		<?php	} ?>

		<nav id="site-navigation"><?php wp_nav_menu( array('menu' => 'Primary Menu') ); ?><span class="social mobile">
				<?php
				if ( $sq->have_posts() ) {
					while ( $sq->have_posts() ) {
						$sq->the_post();
						$links = get_field('links');

						if (have_rows('links')):
							while(have_rows('links')) : the_row();
								$icon = get_sub_field('icon');
								$url = get_sub_field('url');
							?>
							<a class="icon" href="<?php echo $url ?>">
								<img src="<?php echo $icon ?>" />
							</a>
							<?php
							endwhile;
						endif;
					}
					wp_reset_postdata();
				}
				?>
			<span>

		</nav><!-- #site-navigation -->

		<span class="social desktop">
			<?php
			if ( $sq->have_posts() ) {
				while ( $sq->have_posts() ) {
					$sq->the_post();
					$links = get_field('links');

					if (have_rows('links')):
						while(have_rows('links')) : the_row();
							$icon = get_sub_field('icon');
							$url = get_sub_field('url');
						?>
						<a class="icon" href="<?php echo $url ?>">
							<img src="<?php echo $icon ?>" />
						</a>
						<?php
						endwhile;
					endif;
				}
				wp_reset_postdata();
			}
			?>
		</span>

		<span class="burger">
			<svg width="100" height="100" viewbox="0 0 100 100">
				<line x1="10" x2="100" y1="5" y2="5" stroke-width="10" stroke="white" />
				<line x1="40" x2="100" y1="50" y2="50" stroke-width="10" stroke="white" />
				<line x1="70" x2="100" y1="95" y2="95" stroke-width="10" stroke="white" />
				<line x1="-14" x2="106" y1="50" y2="50" stroke-width="10" stroke="white" />
			</svg>
		</span>
	</header><!-- #masthead -->

	<div id="content" class="site-content">
