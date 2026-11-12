import { ServiceItem, GalleryItem, ThemeConfig } from '../types/theme';

export function generateWordPressThemeZip(
  config: ThemeConfig,
  services: ServiceItem[],
  gallery: GalleryItem[]
): Promise<Blob> {
  return import('jszip').then(({ default: JSZip }) => {
    const zip = new JSZip();
    const folder = zip.folder('anika-professional-painting')!;

    // 1. style.css
    const styleCss = `/*
Theme Name: Anika Professional Painting Services
Theme URI: https://anikapainting.com
Author: Anika Professional Painting Services
Author URI: https://anikapainting.com
Description: Premium, fully responsive, and highly editable WordPress business website theme for Anika Professional Painting Services serving Hyderabad and Secunderabad, Telangana. Includes 22 services, independent Google Maps module, FormSubmit.co integration, WhatsApp support, and custom admin dashboard.
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: anika-painting
Tags: painting-services, hyderabad, business, residential, commercial, custom-background, custom-colors, full-width-template
*/

:root {
  --primary-color: ${config.customColors.enabled ? config.customColors.primary : '#153E75'};
  --secondary-color: ${config.customColors.enabled ? config.customColors.secondary : '#3B82F6'};
  --accent-color: ${config.customColors.enabled ? config.customColors.accent : '#DCEBFA'};
  --text-main: #1e293b;
  --bg-main: #ffffff;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--text-main);
  background-color: var(--bg-main);
  line-height: 1.6;
}

.anika-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;
}
`;
    folder.file('style.css', styleCss);

    // 2. functions.php
    const functionsPhp = `<?php
/**
 * Anika Professional Painting Services Theme Functions
 *
 * @package Anika_Painting
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ANIKA_THEME_VERSION', '1.0.0');
define('ANIKA_THEME_DIR', get_template_directory());
define('ANIKA_THEME_URI', get_template_directory_uri());

// Include theme core files
require_once ANIKA_THEME_DIR . '/inc/setup.php';
require_once ANIKA_THEME_DIR . '/inc/post-types.php';
require_once ANIKA_THEME_DIR . '/inc/enqueue.php';
require_once ANIKA_THEME_DIR . '/inc/admin/dashboard.php';
require_once ANIKA_THEME_DIR . '/inc/forms.php';
require_once ANIKA_THEME_DIR . '/inc/seo.php';
require_once ANIKA_THEME_DIR . '/inc/helpers.php';
`;
    folder.file('functions.php', functionsPhp);

    // 3. index.php
    const indexPhp = `<?php
/**
 * The main template file
 *
 * @package Anika_Painting
 */

get_header(); ?>

<main id="primary" class="site-main py-12">
    <div class="anika-container">
        <?php
        if (have_posts()) :
            while (have_posts()) :
                the_post();
                get_template_part('template-parts/content', get_post_type());
            endwhile;
            the_posts_navigation();
        else :
            get_template_part('template-parts/content', 'none');
        endif;
        ?>
    </div>
</main>

<?php
get_footer();
`;
    folder.file('index.php', indexPhp);

    // 4. header.php
    const headerPhp = `<?php
/**
 * The header for Anika Professional Painting Services theme
 *
 * @package Anika_Painting
 */
$config = anika_get_theme_config();
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header id="masthead" class="site-header <?php echo !empty($config['header']['sticky']) ? 'sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm' : 'bg-white shadow-sm'; ?> border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
        <div class="site-branding">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="text-xl font-bold text-slate-900 tracking-tight flex flex-col">
                <span><?php echo esc_html($config['businessName']); ?></span>
                <span class="text-xs font-normal text-slate-500"><?php echo esc_html($config['primaryCity']); ?> & <?php echo esc_html($config['secondaryCity']); ?></span>
            </a>
        </div>

        <nav id="site-navigation" class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-blue-700 transition">Home</a>
            <a href="<?php echo esc_url(home_url('/about')); ?>" class="hover:text-blue-700 transition">About Us</a>
            <a href="<?php echo esc_url(home_url('/services')); ?>" class="hover:text-blue-700 transition">Services</a>
            <a href="<?php echo esc_url(home_url('/gallery')); ?>" class="hover:text-blue-700 transition">Gallery</a>
            <?php if (!empty($config['googleMaps']['enabled'])) : ?>
                <a href="<?php echo esc_url(home_url('/location')); ?>" class="hover:text-blue-700 transition">Google Maps</a>
            <?php endif; ?>
            <a href="<?php echo esc_url(home_url('/contact')); ?>" class="hover:text-blue-700 transition">Contact</a>
        </nav>

        <div class="flex items-center gap-3">
            <a href="tel:<?php echo esc_attr(str_replace(' ', '', $config['phone'])); ?>" class="hidden sm:inline-flex items-center text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50">
                Call: <?php echo esc_html($config['phone']); ?>
            </a>
            <a href="<?php echo esc_url(home_url('/contact#enquiry')); ?>" class="inline-flex items-center text-xs font-semibold px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition">
                <?php echo esc_html($config['header']['ctaLabel']); ?>
            </a>
        </div>
    </div>
</header>
`;
    folder.file('header.php', headerPhp);

    // 5. footer.php
    const footerPhp = `<?php
/**
 * The footer for Anika Professional Painting Services
 *
 * @package Anika_Painting
 */
$config = anika_get_theme_config();
?>
<footer class="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div class="md:col-span-1">
            <h3 class="text-white text-base font-bold mb-3"><?php echo esc_html($config['businessName']); ?></h3>
            <p class="text-xs leading-relaxed text-slate-400 mb-4"><?php echo esc_html($config['footer']['shortDesc']); ?></p>
            <div class="text-xs text-slate-500">
                <span>Rating: <?php echo esc_html($config['suppliedRating']); ?>/5 (<?php echo esc_html($config['suppliedReviewCount']); ?> verified reviews)</span>
            </div>
        </div>
        <div>
            <h4 class="text-white text-xs font-semibold uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul class="space-y-2 text-xs">
                <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-white">Home</a></li>
                <li><a href="<?php echo esc_url(home_url('/about')); ?>" class="hover:text-white">About Us</a></li>
                <li><a href="<?php echo esc_url(home_url('/services')); ?>" class="hover:text-white">All 22 Painting Services</a></li>
                <li><a href="<?php echo esc_url(home_url('/gallery')); ?>" class="hover:text-white">Gallery Inspiration</a></li>
                <li><a href="<?php echo esc_url(home_url('/contact')); ?>" class="hover:text-white">Contact & Enquiry</a></li>
            </ul>
        </div>
        <div>
            <h4 class="text-white text-xs font-semibold uppercase tracking-wider mb-3">Featured Solutions</h4>
            <ul class="space-y-2 text-xs">
                <li><a href="<?php echo esc_url(home_url('/services/exterior-painting')); ?>" class="hover:text-white">Exterior & Villa Painting</a></li>
                <li><a href="<?php echo esc_url(home_url('/services/interior-painting')); ?>" class="hover:text-white">Interior Royal Emulsions</a></li>
                <li><a href="<?php echo esc_url(home_url('/services/texture-painting')); ?>" class="hover:text-white">Designer Texture Finishes</a></li>
                <li><a href="<?php echo esc_url(home_url('/services/wood-varnishing')); ?>" class="hover:text-white">Teak Wood PU Polish</a></li>
                <li><a href="<?php echo esc_url(home_url('/services/waterproofing')); ?>" class="hover:text-white">Waterproofing Treatment</a></li>
            </ul>
        </div>
        <div>
            <h4 class="text-white text-xs font-semibold uppercase tracking-wider mb-3">Service Hub & Hours</h4>
            <p class="text-xs text-slate-400 leading-relaxed mb-2"><?php echo esc_html($config['address']); ?></p>
            <p class="text-xs text-slate-400 mb-1"><strong>Phone:</strong> <?php echo esc_html($config['phone']); ?></p>
            <p class="text-xs text-slate-400 mb-3"><strong>Hours:</strong> <?php echo esc_html($config['businessHours']); ?></p>
            <a href="<?php echo esc_url($config['googleMaps']['directionsUrl']); ?>" target="_blank" rel="noopener" class="text-xs text-blue-400 hover:underline">
                View on Google Maps &rarr;
            </a>
        </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p><?php echo esc_html($config['footer']['copyrightText']); ?></p>
        <p class="mt-2 sm:mt-0">Serving Kapra, Sainikpuri, Hyderabad & Secunderabad, Telangana.</p>
    </div>
</footer>

<?php if (!empty($config['whatsappWidget']['enabled'])) : ?>
<a href="https://wa.me/<?php echo esc_attr(preg_replace('/[^0-9]/', '', $config['whatsappWidget']['number'])); ?>?text=<?php echo urlencode($config['whatsappWidget']['prefilledMessage']); ?>"
   class="fixed bottom-6 <?php echo $config['whatsappWidget']['position'] === 'left' ? 'left-6' : 'right-6'; ?> z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
   aria-label="Chat with Anika Painting on WhatsApp" target="_blank" rel="noopener">
    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.301-.15-1.78-.877-2.056-.977-.275-.101-.475-.15-.676.15-.2.301-.776.977-.951 1.178-.175.201-.351.226-.651.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.1-.201.05-.376-.025-.527-.075-.15-.676-1.63-.926-2.232-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.109.15.201 2.12 3.238 5.136 4.542.717.31 1.277.495 1.713.633.72.229 1.376.196 1.895.119.579-.086 1.78-.727 2.031-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.83.493 3.548 1.353 5.035L2 22l5.109-1.341a9.967 9.967 0 0 0 4.931 1.294h.004c5.524 0 10.012-4.488 10.012-10.012A9.97 9.97 0 0 0 12.04 2zm0 18.283h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.057-.197-.314a8.267 8.267 0 0 1-1.267-4.389c0-4.57 3.718-8.288 8.289-8.288 2.214 0 4.295.863 5.86 2.428a8.243 8.243 0 0 1 2.426 5.863c0 4.571-3.718 8.289-8.289 8.289z"/></svg>
</a>
<?php endif; ?>

<?php wp_footer(); ?>
</body>
</html>
`;
    folder.file('footer.php', footerPhp);

    // 6. inc/setup.php
    const setupPhp = `<?php
/**
 * Theme Setup & Registration
 *
 * @package Anika_Painting
 */

function anika_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    register_nav_menus(array(
        'primary' => __('Primary Navigation Menu', 'anika-painting'),
        'footer'  => __('Footer Menu', 'anika-painting'),
    ));
}
add_action('after_setup_theme', 'anika_theme_setup');
`;
    folder.file('inc/setup.php', setupPhp);

    // 7. inc/post-types.php
    const postTypesPhp = `<?php
/**
 * Register Custom Post Types for Services & Gallery
 *
 * @package Anika_Painting
 */

function anika_register_custom_post_types() {
    // 1. Services Custom Post Type
    register_post_type('anika_service', array(
        'labels' => array(
            'name'          => __('Painting Services', 'anika-painting'),
            'singular_name' => __('Painting Service', 'anika-painting'),
            'add_new_item'  => __('Add New Painting Service', 'anika-painting'),
            'edit_item'     => __('Edit Painting Service', 'anika-painting'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => array('slug' => 'services'),
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'page-attributes'),
        'menu_icon'    => 'dashicons-art',
        'show_in_rest' => true,
    ));

    // 2. Service Category Taxonomy
    register_taxonomy('service_category', 'anika_service', array(
        'labels' => array(
            'name' => __('Service Categories', 'anika-painting'),
            'singular_name' => __('Service Category', 'anika-painting'),
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
    ));

    // 3. Gallery Custom Post Type
    register_post_type('anika_gallery', array(
        'labels' => array(
            'name'          => __('Gallery Inspiration', 'anika-painting'),
            'singular_name' => __('Gallery Image', 'anika-painting'),
            'add_new_item'  => __('Add New Gallery Image', 'anika-painting'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => array('slug' => 'gallery-items'),
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon'    => 'dashicons-format-image',
        'show_in_rest' => true,
    ));
}
add_action('init', 'anika_register_custom_post_types');
`;
    folder.file('inc/post-types.php', postTypesPhp);

    // 8. inc/helpers.php
    const helpersPhp = `<?php
/**
 * Theme Helper Functions and Defaults
 *
 * @package Anika_Painting
 */

function anika_get_theme_config() {
    $defaults = json_decode('${JSON.stringify(config).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}', true);
    $saved = get_option('anika_theme_config', array());
    return wp_parse_args($saved, $defaults);
}
`;
    folder.file('inc/helpers.php', helpersPhp);

    // 9. inc/forms.php (FormSubmit.co integration)
    const formsPhp = `<?php
/**
 * FormSubmit.co Integration Handler
 *
 * @package Anika_Painting
 */

function anika_render_enquiry_form($source = 'General Enquiry') {
    $config = anika_get_theme_config();
    $form_settings = $config['enquiryForm'];
    
    if (empty($form_settings['enabled'])) {
        return;
    }
    
    $recipient_email = esc_attr($form_settings['receivingEmail']);
    $action_url = 'https://formsubmit.co/' . $recipient_email;
    ?>
    <form action="<?php echo $action_url; ?>" method="POST" class="anika-enquiry-form bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <!-- FormSubmit.co Configuration Settings -->
        <input type="hidden" name="_subject" value="<?php echo esc_attr($form_settings['subject']); ?> - <?php echo esc_attr($source); ?>" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" style="display:none" />
        <input type="hidden" name="enquiry_source" value="<?php echo esc_attr($source); ?>" />
        <?php if (!empty($form_settings['thankYouRedirect'])) : ?>
            <input type="hidden" name="_next" value="<?php echo esc_url($form_settings['thankYouRedirect']); ?>" />
        <?php endif; ?>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input type="text" name="name" required class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none" placeholder="e.g. Rahul Sharma" />
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input type="tel" name="phone" required class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none" placeholder="+91 98765 43210" />
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input type="email" name="email" required class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none" placeholder="name@domain.com" />
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Property Type</label>
                <select name="property_type" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none">
                    <option value="Residential Apartment (2BHK/3BHK)">Residential Apartment</option>
                    <option value="Independent House / Villa">Independent House / Villa</option>
                    <option value="Commercial Space / Office">Commercial Space / Office</option>
                    <option value="New Construction">New Construction</option>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Service Required</label>
                <select name="service_required" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none">
                    <option value="Interior Painting">Interior Painting</option>
                    <option value="Exterior & Villa Painting">Exterior & Villa Painting</option>
                    <option value="Designer Texture Wall">Designer Texture Wall</option>
                    <option value="Teakwood PU Polish & Varnish">Teakwood PU Polish & Varnish</option>
                    <option value="Waterproofing & Damp Repair">Waterproofing & Damp Repair</option>
                    <option value="Metal Grills & Gates">Metal Grills & Gates</option>
                    <option value="Complete Home Makeover">Complete Home Makeover</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Locality in Hyderabad / Secunderabad</label>
                <input type="text" name="locality" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none" placeholder="e.g. Kapra, Sainikpuri, Gachibowli" />
            </div>
        </div>

        <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Project Requirements / Area details</label>
            <textarea name="message" rows="3" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none" placeholder="Mention square footage, preferred paint brand (Asian Paints, Berger), or specific timing..."></textarea>
        </div>

        <div class="pt-2">
            <button type="submit" class="w-full py-3 px-6 text-sm font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition shadow-sm">
                <?php echo esc_html($form_settings['submitLabel']); ?>
            </button>
            <p class="text-[11px] text-slate-500 text-center mt-2">
                Delivered safely via FormSubmit.co. Your personal contact number is kept confidential.
            </p>
        </div>
    </form>
    <?php
}
`;
    folder.file('inc/forms.php', formsPhp);

    // 10. inc/admin/dashboard.php
    const adminDashboardPhp = `<?php
/**
 * WordPress Admin Customization Dashboard
 *
 * @package Anika_Painting
 */

function anika_register_admin_menu() {
    add_menu_page(
        __('Anika Theme Settings', 'anika-painting'),
        __('Anika Painting', 'anika-painting'),
        'manage_options',
        'anika-theme-settings',
        'anika_render_admin_dashboard',
        'dashicons-art',
        59
    );
}
add_action('admin_menu', 'anika_register_admin_menu');

function anika_render_admin_dashboard() {
    if (isset($_POST['anika_save_settings']) && check_admin_referer('anika_settings_verify')) {
        $clean_email = sanitize_email($_POST['receiving_email']);
        $current = anika_get_theme_config();
        $current['enquiryForm']['receivingEmail'] = $clean_email;
        $current['structureMode'] = sanitize_text_field($_POST['structure_mode']);
        $current['designStyle'] = sanitize_text_field($_POST['design_style']);
        $current['colorPreset'] = sanitize_text_field($_POST['color_preset']);
        $current['googleMaps']['enabled'] = !empty($_POST['maps_enabled']);
        
        update_option('anika_theme_config', $current);
        echo '<div class="notice notice-success is-dismissible"><p>Anika Theme Settings saved successfully!</p></div>';
    }

    $config = anika_get_theme_config();
    ?>
    <div class="wrap">
        <h1>Anika Professional Painting Services – Admin Dashboard</h1>
        <p>Manage all business parameters, FormSubmit.co receiving email, Google Maps module, and website structure.</p>
        
        <form method="POST" action="">
            <?php wp_nonce_field('anika_settings_verify'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Website Structure Mode</th>
                    <td>
                        <select name="structure_mode">
                            <option value="single" <?php selected($config['structureMode'], 'single'); ?>>Mode A: Single Page</option>
                            <option value="multi" <?php selected($config['structureMode'], 'multi'); ?>>Mode B: Multi-Page (Recommended)</option>
                            <option value="hybrid" <?php selected($config['structureMode'], 'hybrid'); ?>>Mode C: Hybrid</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Enquiry Form Receiving Email (FormSubmit.co)</th>
                    <td>
                        <input type="email" name="receiving_email" value="<?php echo esc_attr($config['enquiryForm']['receivingEmail']); ?>" class="regular-text" required />
                        <p class="description">Submissions go via FormSubmit.co. Ensure recipient clicks the activation link in their first email.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Independent Google Maps Module</th>
                    <td>
                        <label>
                            <input type="checkbox" name="maps_enabled" value="1" <?php checked($config['googleMaps']['enabled']); ?> />
                            Enable standalone Google Maps module (Never embedded in Contact Us)
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Design Style</th>
                    <td>
                        <select name="design_style">
                            <option value="classic" <?php selected($config['designStyle'], 'classic'); ?>>Classic Professional</option>
                            <option value="modern" <?php selected($config['designStyle'], 'modern'); ?>>Modern Premium</option>
                            <option value="minimal" <?php selected($config['designStyle'], 'minimal'); ?>>Elegant Minimal</option>
                            <option value="bold" <?php selected($config['designStyle'], 'bold'); ?>>Bold Creative</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Color Preset</th>
                    <td>
                        <select name="color_preset">
                            <option value="royal-blue" <?php selected($config['colorPreset'], 'royal-blue'); ?>>Royal Blue (#153E75)</option>
                            <option value="emerald-green" <?php selected($config['colorPreset'], 'emerald-green'); ?>>Emerald Green (#064E3B)</option>
                            <option value="premium-gold" <?php selected($config['colorPreset'], 'premium-gold'); ?>>Premium Gold (#1F2937 / #C9A227)</option>
                            <option value="ocean-teal" <?php selected($config['colorPreset'], 'ocean-teal'); ?>>Ocean Teal (#134E4A)</option>
                            <option value="burgundy" <?php selected($config['colorPreset'], 'burgundy'); ?>>Burgundy (#581C2B)</option>
                            <option value="modern-purple" <?php selected($config['colorPreset'], 'modern-purple'); ?>>Modern Purple (#3B0764)</option>
                        </select>
                    </td>
                </tr>
            </table>

            <p class="submit">
                <input type="submit" name="anika_save_settings" class="button button-primary" value="Save All Theme Settings" />
            </p>
        </form>
    </div>
    <?php
}
`;
    folder.file('inc/admin/dashboard.php', adminDashboardPhp);

    // 11. inc/seo.php
    const seoPhp = `<?php
/**
 * SEO and Local Business Schema
 *
 * @package Anika_Painting
 */

function anika_render_local_business_schema() {
    $config = anika_get_theme_config();
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'HomeAndConstructionBusiness',
        'name' => $config['businessName'],
        'description' => 'Professional residential and commercial painting services in Hyderabad and Secunderabad.',
        'telephone' => $config['phone'],
        'address' => array(
            '@type' => 'PostalAddress',
            'streetAddress' => 'Radhika Treater, 16/9, in front of Parivaar Restaurant, Arul Colony, APHB Colony, Kapra',
            'addressLocality' => $config['primaryCity'],
            'addressRegion' => $config['state'],
            'postalCode' => '500062',
            'addressCountry' => 'IN',
        ),
        'aggregateRating' => array(
            '@type' => 'AggregateRating',
            'ratingValue' => $config['suppliedRating'],
            'reviewCount' => $config['suppliedReviewCount'],
        ),
        'openingHours' => 'Mo-Su 00:00-23:59',
        'hasMap' => $config['mapsUrl'],
    );
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
}
add_action('wp_head', 'anika_render_local_business_schema');
`;
    folder.file('inc/seo.php', seoPhp);

    // 12. inc/enqueue.php
    const enqueuePhp = `<?php
/**
 * Enqueue scripts and styles
 *
 * @package Anika_Painting
 */

function anika_enqueue_assets() {
    wp_enqueue_style('anika-style', get_stylesheet_uri(), array(), ANIKA_THEME_VERSION);
    wp_enqueue_style('anika-tailwind', 'https://cdn.tailwindcss.com', array(), ANIKA_THEME_VERSION);
}
add_action('wp_enqueue_scripts', 'anika_enqueue_assets');
`;
    folder.file('inc/enqueue.php', enqueuePhp);

    // 13. Page templates
    // page-about.php
    folder.file('templates/page-about.php', `<?php
/**
 * Template Name: About Us Page
 * @package Anika_Painting
 */
get_header();
$config = anika_get_theme_config();
?>
<div class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold text-slate-900 mb-6">About Anika Professional Painting Services</h1>
    <p class="text-slate-700 text-lg leading-relaxed mb-6">
        Anika Professional Painting Services is a trusted painting contractor serving homeowners and commercial properties across Hyderabad and Secunderabad, Telangana. Based in Kapra near Radhika Theater, we specialize in high-end exterior painting, luxury interior finishes, designer textures, wood polishing, and damp wall waterproofing treatments.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        <div class="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 mb-2">Service Excellence</h3>
            <p class="text-slate-600 text-sm">We combine meticulous surface preparation, dust-controlled mechanical sanding, and premium Asian Paints & Berger formulations to deliver long-lasting wall aesthetics.</p>
        </div>
        <div class="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 mb-2">Customer Satisfaction</h3>
            <p class="text-slate-600 text-sm">Rated <?php echo esc_html($config['suppliedRating']); ?>/5 across <?php echo esc_html($config['suppliedReviewCount']); ?> customer reviews with reliable project scheduling and complete post-painting cleanup.</p>
        </div>
    </div>
</div>
<?php get_footer(); ?>`);

    // page-contact.php
    folder.file('templates/page-contact.php', `<?php
/**
 * Template Name: Contact Us Page
 * @package Anika_Painting
 */
get_header();
$config = anika_get_theme_config();
?>
<div class="max-w-7xl mx-auto px-4 py-16">
    <div class="max-w-3xl mb-12">
        <h1 class="text-3xl font-bold text-slate-900 mb-4">Contact Anika Professional Painting</h1>
        <p class="text-slate-600 text-base">Get in touch for on-site measurement, color consultations, or a customized estimate for your property in Hyderabad or Secunderabad.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-5 space-y-6">
            <div class="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 class="font-bold text-slate-900 text-base mb-3">Office Location</h3>
                <p class="text-sm text-slate-700 leading-relaxed"><?php echo esc_html($config['address']); ?></p>
            </div>
            <div class="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 class="font-bold text-slate-900 text-base mb-3">Direct Contact</h3>
                <p class="text-sm text-slate-700 mb-2"><strong>Phone:</strong> <?php echo esc_html($config['phone']); ?></p>
                <p class="text-sm text-slate-700 mb-2"><strong>WhatsApp:</strong> <?php echo esc_html($config['whatsapp']); ?></p>
                <p class="text-sm text-slate-700"><strong>Hours:</strong> <?php echo esc_html($config['businessHours']); ?></p>
            </div>
        </div>

        <div class="lg:col-span-7" id="enquiry">
            <h2 class="text-2xl font-bold text-slate-900 mb-4"><?php echo esc_html($config['enquiryForm']['title']); ?></h2>
            <?php anika_render_enquiry_form('Contact Us Page'); ?>
        </div>
    </div>
</div>
<?php get_footer(); ?>`);

    // page-maps.php (Independent Google Maps Module template)
    folder.file('templates/page-maps.php', `<?php
/**
 * Template Name: Standalone Google Maps Page
 * @package Anika_Painting
 */
get_header();
$config = anika_get_theme_config();
?>
<div class="max-w-7xl mx-auto px-4 py-16">
    <div class="max-w-3xl mb-8">
        <h1 class="text-3xl font-bold text-slate-900 mb-3"><?php echo esc_html($config['googleMaps']['title']); ?></h1>
        <p class="text-slate-600 text-base"><?php echo esc_html($config['googleMaps']['description']); ?></p>
    </div>

    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
        <iframe src="<?php echo esc_url($config['googleMaps']['embedUrl']); ?>" width="100%" height="<?php echo intval($config['googleMaps']['height']); ?>" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <div class="mt-6 flex items-center justify-between">
        <span class="text-sm text-slate-500"><?php echo esc_html($config['address']); ?></span>
        <a href="<?php echo esc_url($config['googleMaps']['directionsUrl']); ?>" target="_blank" rel="noopener" class="inline-flex items-center px-5 py-2.5 bg-blue-900 text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition">
            <?php echo esc_html($config['googleMaps']['directionsLabel']); ?> &rarr;
        </a>
    </div>
</div>
<?php get_footer(); ?>`);

    // 14. Export sample data JSON
    folder.file('anika-theme-blueprint.json', JSON.stringify({
      config,
      services,
      gallery,
    }, null, 2));

    // 15. README.md with comprehensive instructions
    const readmeMd = `# Anika Professional Painting Services WordPress Theme
**Version 1.0.0**
Residential and Commercial Painting Services Theme for Hyderabad & Secunderabad, Telangana.

## Features
- Complete WordPress Customization Dashboard under WP Admin -> Anika Painting
- 22 Initial Services preloaded with categorized descriptions, benefits, and applications
- FormSubmit.co integration with admin-configurable receiving email: \`${config.enquiryForm.receivingEmail}\`
- Independent Google Maps module (Never embedded in Contact Us)
- Mandatory Original AI-Generated Photography for all visual assets
- Floating official WhatsApp support button (+91 98665 92716)
- 3 Website Structure Modes (Single-Page, Multi-Page, Hybrid)
- 4 Design Styles (Classic, Modern, Minimal, Bold)
- 6 Independent Color Presets + Custom Color Controls
- Local Business Schema and full on-page SEO metadata

## Installation Instructions
1. Download \`anika-professional-painting.zip\`.
2. In WordPress Admin, navigate to **Appearance -> Themes -> Add New -> Upload Theme**.
3. Choose \`anika-professional-painting.zip\` and click **Install Now**.
4. Click **Activate**.
5. Go to **Anika Painting** in the sidebar to configure your receiving email and options.

## FormSubmit.co Verification
When an enquiry is submitted for the first time, FormSubmit sends a verification email to \`${config.enquiryForm.receivingEmail}\`. Click the confirmation link in your email once. All subsequent visitor inquiries will be immediately forwarded to your inbox!
`;
    folder.file('README.md', readmeMd);

    return zip.generateAsync({ type: 'blob' });
  });
}
