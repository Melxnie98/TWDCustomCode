<?php>
function remove_event_date_from_urls($content) {
    // Match URLs containing "?event-date=" and remove everything after it
    $content = preg_replace('/\?event-date=[^"]*/', '', $content);
    return $content;
}
add_filter('the_content', 'remove_event_date_from_urls'); // post content
add_filter('widget_text', 'remove_event_date_from_urls'); //  widget content
add_filter('widget_text_content', 'remove_event_date_from_urls'); // dynamic widgets
add_filter('the_excerpt', 'remove_event_date_from_urls'); // post excerpts

// To handle URLs in links, you can filter the entire page's HTML
function remove_event_date_from_links($html) {
    // This will find and remove any "?event-date=" part from href attributes
    $html = preg_replace('/\?event-date=[^"]*/', '', $html);
    return $html;
}
add_filter('the_posts', 'remove_event_date_from_links');
add_filter('wp_footer', 'remove_event_date_from_links'); // Handle footer links (optional)
add_filter('wp_head', 'remove_event_date_from_links'); // Handle head links (optional)
