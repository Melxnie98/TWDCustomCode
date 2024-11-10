<?php
add_filter('the_content', 'replace_media_urls');

function replace_media_urls($content) {
    return str_replace('/files/', '/wp-content/uploads/', $content);
}
