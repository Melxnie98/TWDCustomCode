<?php
add_action('init', 'check_for_broken_links');

function check_for_broken_links() {
    // Initialize a counter for the number of links checked
    $links_checked = 0;

    // Send an email when the check starts (optional)
    $to = 'email@email.com'; // Your email address
    $subject = 'Starting Broken Link Check';
    $message = "The process of checking for broken links on your site has started.\n\n";
    wp_mail($to, $subject, $message);

    // Log for debugging (optional)
    error_log('check_for_broken_links function was called.');
    
    // Get all posts and pages from the database
    $args = array(
        'post_type'      => array('post', 'page'),
        'posts_per_page' => -1, // Get all posts and pages
        'post_status'    => 'publish', // Only published posts/pages
    );
    
    $query = new WP_Query($args);

    // Loop through all posts/pages
    while ($query->have_posts()) {
        $query->the_post();

        // Get the content of the post/page
        $content = get_post_field('post_content', get_the_ID());
        
        // Find all links (anchor tags) in the content
        preg_match_all('/<a\s+href=["\'](https?:\/\/[^"\']+)["\']/i', $content, $matches);
        
        // Loop through each link and check if it's broken
        foreach ($matches[1] as $url) {
            // Skip empty URLs
            if (empty($url)) continue;
            
            // Check the status of the URL
            $status = check_url_status($url);

            // If the URL is broken (404), send an email with the broken link info
            if ($status == 404) {
                $subject = 'Broken Link Found on Your Site';
                $message = "A broken link has been found on your site:\n\n";
                $message .= "Page: " . get_permalink() . "\n";
                $message .= "Broken Link: " . $url . "\n\n";

                // Send an email for each broken link found
                wp_mail($to, $subject, $message);
            }

            // Track the number of links checked
            $links_checked++;
        }
    }
}

// Function to check the status of a URL using the HTTP response code
function check_url_status($url) {
    // Use the `get_headers` function to get the headers for the URL
    $headers = @get_headers($url);
    
    // If no headers returned, treat it as a broken link
    if ($headers === false) {
        return 404;
    }

    // Check the HTTP status code 
    $status_code = substr($headers[0], 9, 3); // Extract the status code

    return $status_code;
