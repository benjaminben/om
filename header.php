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

		<nav id="site-navigation">
			<?php
				wp_nav_menu( array(
					'menu' => 'Primary Menu',
				) );
			?>
		</nav><!-- #site-navigation -->

		<span class="burger">
			BURG
		</span>
	</header><!-- #masthead -->

	<div id="content" class="site-content">
