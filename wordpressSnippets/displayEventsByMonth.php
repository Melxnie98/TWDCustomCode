<?php
// Function to display events by month. written for calendar+ plugin for campuspress. If you have any issues email melanieleonard98@hotmail.com
//works with shortcode [events_by_month]
function display_events_by_month() {
    global $wpdb;

    // Query event data from the custom table
    $query = "
        SELECT * 
        FROM {$wpdb->prefix}calendarp_calendar 
        WHERE from_date >= CURDATE() 
        ORDER BY from_date ASC
    ";

    // Run the query and fetch results
    $events = $wpdb->get_results($query);

    // If there are no events, output a message
    if (!$events) {
        return '<p>No upcoming events found.</p>';
    }

    // Array to store events by month
    $events_by_month = [];

    // Group events by month
    foreach ($events as $event) {
        $from_date = $event->from_date;
        $from_date_group = date('Y-m', strtotime($from_date)); // Group by Year-Month (Y-m)

        // Get the event title from the event ID stored in the custom table
        $event_title = get_the_title($event->event_id); // Fetch the title from WordPress post ID
        $event_link = get_permalink($event->event_id); // Get the permalink (URL) of the event post

        // Group events by month
        $events_by_month[$from_date_group][] = [
            'event_id'     => $event->event_id,
            'title'        => $event_title,
            'link'         => $event_link,
            'from_date'    => $event->from_date,
            'until_date'   => $event->until_date,
            'from_time'    => $event->from_time,
            'until_time'   => $event->until_time,
        ];
    }

    // Start the output
    $output = '';

    // Loop through each month and display the events
    foreach ($events_by_month as $month => $events) {
        // Display the month header (e.g., February 2025)
        $output .= '<h2>' . date('F Y', strtotime($month . '-01')) . '</h2>';
        
        // Display each event under the current month
        foreach ($events as $event) {
            // Format date and time for display
            $formatted_from_date = date('F j, Y', strtotime($event['from_date']));
            $formatted_until_date = date('F j, Y', strtotime($event['until_date']));
            $formatted_from_time = date('g:i A', strtotime($event['from_time']));
            $formatted_until_time = date('g:i A', strtotime($event['until_time']));

            // Check if it's an all-day event (12:00 AM to 11:59 PM)
            if ($event['from_time'] === '00:00:00' && $event['until_time'] === '23:59:00') {
                // If it's an all-day event, only show the date without the time
                $time_display = '<p><strong>Date:</strong> ' . esc_html($formatted_from_date) . '</p>';
            } else {
                // For regular events, show the date on one line and time on the next
                $time_display = '<p><strong>Date:</strong> ' . esc_html($formatted_from_date) . '</p>';
                $time_display .= '<p><strong>From:</strong> ' . esc_html($formatted_from_time) . ' <strong>Until:</strong> ' . esc_html($formatted_until_time) . '</p>';
            }

            // Append event details to the output
            $output .= '<div class="event-item">';
            $output .= '<h3><a href="' . esc_url($event['link']) . '">' . esc_html($event['title']) . '</a></h3>';
            $output .= $time_display;
            $output .= '</div>';
        }
    }

    // Return the output - shortcode
    return $output;
}

// Reg shortcode
function register_events_by_month_shortcode() {
    add_shortcode('events_by_month', 'display_events_by_month');
}

// Hook reg func
add_action('init', 'register_events_by_month_shortcode');
