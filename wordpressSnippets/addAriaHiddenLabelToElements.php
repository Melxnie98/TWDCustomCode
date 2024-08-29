<?php
function add_aria_hidden_to_class($content) {
    // Debugging: Log raw content
    error_log("Raw content: " . $content);

    // Regular expression to match any HTML element with the class 'ariaHidden'
    $pattern = '/<(\w+)\s+class="([^"]*\s+)?ariaHidden([^"]*)">/i';                
    $replacement = '<$1 class="$2ariaHidden$3" aria-hidden="true">';               

    // Log patterns and replacements
    error_log("Pattern: " . $pattern);
    error_log("Replacement: " . $replacement);

    $content = preg_replace($pattern, $replacement, $content);

    // Log modified content
    error_log("Modified content: " . $content);

    return $content;
}
add_filter('the_content', 'add_aria_hidden_to_class');


//Delete following before use, just explanation
////<(\w+): Matches the opening tag of any HTML element. (\w+) captures the tag name (e.g., div, img). \s+class=": Matches the class attribute of the element 
//([^"]*\s+)?: Optionally matches any classes before ariaHidden. 
//[^"]* matches any characters except double quotes, and \s+ matches one or more spaces. 
///i: Case-insensitive modifier to match class names regardless of their case.
//<$1: Inserts the matched tag name (from (\w+)).
//class="$2ariaHidden$3": Reconstructs the class attribute with the existing classes before ($2) and after ($3) ariaHidden, ensuring ariaHidden is included and adding aria-hidden="true".
//aria-hidden="true": Adds the aria-hidden="true" attribute to the element.
//preg_replace: Searches $content for matches to $pattern and replaces them with $replacement.. The result is stored back in $content, which now includes aria-hidden="true" where appropriate.
//add_filter: Adds a function to a filter hook.
//'the_content': The hook that applies to post and page content.
//'add_aria_hidden_to_class': The function to be called to modify the content.
