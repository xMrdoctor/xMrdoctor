<?php
// blog.php
// PHP script for the simple blog engine

// More code will be added here later for:
// 1. Reading markdown files from the 'posts/' directory
// 2. Parsing markdown content to HTML
// 3. Displaying a list of blog posts
// 4. Displaying individual blog posts

// For now, this is a placeholder.

define('POSTS_DIR', __DIR__ . '/../posts/'); // Define the posts directory relative to this script

/**
 * Fetches a list of markdown files from the posts directory.
 * For now, it just lists them. Later it will extract titles/metadata.
 */
function get_all_posts() {
    $files = glob(POSTS_DIR . '*.md');
    $posts = [];
    if ($files) {
        foreach ($files as $file) {
            // For now, just use the filename. Later, we can parse titles from content.
            $posts[] = [
                'filename' => basename($file),
                'title' => pathinfo(basename($file), PATHINFO_FILENAME) // Simple title from filename
            ];
        }
    }
    return $posts;
}

/**
 * Basic Markdown to HTML parser.
 * Supports:
 * - Headings (#, ##, ###)
 * - Bold (**text** or __text__)
 * - Italics (*text* or _text_)
 * - Links ([text](url))
 * - Unordered lists (* or - list item)
 * - Ordered lists (1. list item)
 * - Code blocks (```\ncode\n```)
 * - Inline code (`code`)
 * - Blockquotes (> quote)
 * - Horizontal rules (--- or ***)
 * - Paragraphs (separated by double newlines)
 * - Images (![alt](src))
 */
function parse_markdown_to_html($markdown) {
    $html = $markdown;

    // Normalize line endings
    $markdown = str_replace(["\r\n", "\r"], "\n", $markdown);

    // Split markdown into blocks (paragraphs, lists, code blocks etc.)
    $blocks = explode("\n\n", $markdown);
    $html_output = "";

    $in_list = false;
    $list_type = '';

    foreach ($blocks as $block) {
        $trimmed_block = trim($block);
        if (empty($trimmed_block)) {
            if ($in_list) { // End current list if block is empty
                $html_output .= "</$list_type>\n";
                $in_list = false;
            }
            continue;
        }

        // Code blocks (```...```)
        if (preg_match('/^```(\w*)\n(.*?)\n^```/ms', $block, $matches)) {
            if ($in_list) { $html_output .= "</$list_type>\n"; $in_list = false; }
            $language = !empty($matches[1]) ? ' class="language-' . htmlspecialchars($matches[1]) . '"' : '';
            $html_output .= '<pre><code' . $language . '>' . htmlspecialchars($matches[2]) . '</code></pre>' . "\n";
            continue;
        }

        // Horizontal Rules (--- or ***)
        if (preg_match('/^\s*([-*_]){3,}\s*$/m', $trimmed_block)) {
            if ($in_list) { $html_output .= "</$list_type>\n"; $in_list = false; }
            $html_output .= "<hr>\n";
            continue;
        }

        // Headings (e.g., # Heading 1, ## Heading 2)
        if (preg_match('/^(#{1,6})\s+(.+)$/', $trimmed_block, $matches)) {
            if ($in_list) { $html_output .= "</$list_type>\n"; $in_list = false; }
            $level = strlen($matches[1]);
            $html_output .= "<h$level>" . parse_inline_markdown(trim($matches[2])) . "</h$level>\n";
            continue;
        }

        // Blockquotes (> quote)
        if (strpos($trimmed_block, '>') === 0) {
            if ($in_list) { $html_output .= "</$list_type>\n"; $in_list = false; }
            $bq_content = preg_replace('/^>\s?/m', '', $trimmed_block);
            $bq_lines = explode("\n", $bq_content);
            $parsed_bq_lines = array_map('parse_inline_markdown', $bq_lines);
            $html_output .= "<blockquote>" . implode("<br>\n", $parsed_bq_lines) . "</blockquote>\n";
            continue;
        }

        // List items (*, -, +, or 1.)
        $lines = explode("\n", $trimmed_block);
        $is_current_block_list = false;
        $current_block_list_type = '';
        $list_items_html = "";

        foreach ($lines as $i => $line) {
            $trimmed_line = trim($line);
            if (preg_match('/^([*+-])\s+(.+)$/', $trimmed_line, $matches_ul) || preg_match('/^(\d+)\.\s+(.+)$/', $trimmed_line, $matches_ol)) {
                $is_current_block_list = true;
                $item_content = isset($matches_ul[2]) ? $matches_ul[2] : $matches_ol[2];
                $current_item_list_type = isset($matches_ul[1]) ? 'ul' : 'ol';

                if (!$in_list) {
                    $in_list = true;
                    $list_type = $current_item_list_type;
                    $list_items_html .= "<$list_type>\n";
                } elseif ($list_type !== $current_item_list_type) {
                    // Different list type, close old, start new
                    $list_items_html .= "</$list_type>\n";
                    $list_type = $current_item_list_type;
                    $list_items_html .= "<$list_type>\n";
                }
                $list_items_html .= "  <li>" . parse_inline_markdown(trim($item_content)) . "</li>\n";
            } else {
                 // Not a list item, or list ended
                if ($in_list) {
                    $list_items_html .= "</$list_type>\n";
                    $in_list = false;
                }
                 // If this line is not empty and was part of a block that started as a list, it's a new paragraph.
                if (!empty($trimmed_line) && $is_current_block_list) {
                     $html_output .= $list_items_html; // Output collected list items
                     $list_items_html = ""; // Reset for next potential list
                     $is_current_block_list = false; // Current line is not list item
                     $html_output .= "<p>" . parse_inline_markdown($trimmed_line) . "</p>\n"; // Treat as new paragraph
                } elseif (!empty($trimmed_line)) { // A normal paragraph line within a block
                    // This case handles parts of a block that are not list items
                    // (e.g. if a block has mixed content, though ideally blocks are uniform)
                    // This might need more refinement for mixed content blocks.
                    // For now, if it's not a list item, and we are not in a list, it will be handled by paragraph logic later.
                    if ($is_current_block_list) { // Should not be reached if logic above is correct
                         $html_output .= $list_items_html; $list_items_html = ""; $is_current_block_list = false;
                    }
                }
                break; // Stop processing lines in this block as list items if a non-list item is found
            }
        }
        if ($is_current_block_list) {
            $html_output .= $list_items_html;
            // Don't close list here if next block continues it. Handled by empty block or different block type.
        }


        // Paragraph: if it's not any of the above
        if (!$is_current_block_list && !preg_match('/^<(h[1-6]|ul|ol|li|hr|pre|blockquote|table|thead|tbody|tr|th|td)/i', $trimmed_block)) {
            if ($in_list) { $html_output .= "</$list_type>\n"; $in_list = false; } // Close list if paragraph starts
            $html_output .= "<p>" . parse_inline_markdown($trimmed_block) . "</p>\n";
        }
    }
    // Ensure any open list is closed at the end of all blocks
    if ($in_list) {
        $html_output .= "</$list_type>\n";
    }

    return $html_output;
}

/**
 * Helper function to parse only inline Markdown elements.
 * This is called by the main parser for content within blocks like paragraphs, list items, blockquotes.
 */
function parse_inline_markdown($text) {
    // Images: ![alt text](image_url.jpg)
    $text = preg_replace('/!\[([^\]]+)\]\(([^)]+)\)/', '<img src="$2" alt="$1">', $text);

    // Links: [link text](url)
    $text = preg_replace('/\[([^\]]+)\]\(([^)]+)\)/', '<a href="$2">$1</a>', $text);

    // Bold (**text** or __text__)
    $text = preg_replace('/(\*\*|__)(.*?)\1/', '<strong>$2</strong>', $text);

    // Italics (*text* or _text_)
    // Ensure these don't conflict with bold or other markdown using * or _
    $text = preg_replace('/(?<![\*_])\*(?!\s)([^<\s].*?[^>\s])\*(?![\*_])/', '<em>$1</em>', $text); // *italic*
    $text = preg_replace('/(?<![\*_])_(?!\s)([^<\s].*?[^>\s])_(?![\*_])/', '<em>$1</em>', $text);    // _italic_

    // Inline code (`code`)
    $text = preg_replace('/`([^`]+)`/', '<code>$1</code>', $text);

    return $text;
}


// Basic routing: if a specific post is requested (e.g., blog.php?post=sample-post.md)
if (isset($_GET['post'])) {
    $post_filename = basename($_GET['post']); // Sanitize filename
    $post_filepath = POSTS_DIR . $post_filename;

    if (file_exists($post_filepath) && pathinfo($post_filepath, PATHINFO_EXTENSION) == 'md') {
        $markdown_content = file_get_contents($post_filepath);
        $html_content = parse_markdown_to_html($markdown_content);
        $post_title = htmlspecialchars(pathinfo($post_filename, PATHINFO_FILENAME)); // Use filename as title for now

        // Output basic HTML structure for a single post view
        echo "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
        echo "<title>" . $post_title . " - My Blog</title>";
        // Link to the main stylesheet (adjust path as necessary)
        echo "<link rel='stylesheet' href='../style.css'>";
        echo "<style>
                body { padding: 20px; line-height: 1.8; }
                .blog-container { max-width: 800px; margin: 20px auto; background-color: var(--surface-color); padding: 2rem; border-radius: 8px; }
                .blog-container img { max-width: 100%; height: auto; border-radius: 4px; margin: 1rem 0; }
                .blog-container pre { background-color: #2d2d2d; color: #f0f0f0; padding: 1em; border-radius: 5px; overflow-x: auto; font-family: 'Courier New', Courier, monospace; font-size: 0.9em;}
                .blog-container code { font-family: 'Courier New', Courier, monospace; background-color: #2d2d2d; padding: 0.2em 0.4em; border-radius: 3px; color: #f0f0f0;}
                .blog-container blockquote { border-left: 4px solid var(--primary-color); padding-left: 1rem; margin-left: 0; font-style: italic; color: var(--medium-emphasis-text-color); }
                .blog-container ul, .blog-container ol { margin-left: 2rem; margin-bottom: 1rem; }
              </style>";
        echo "</head><body>";
        echo "<div class='container blog-container'>"; // Apply container and a specific blog post style
        echo "<h1>" . $post_title . "</h1>";
        // Could add metadata here like publish date if available
        echo $html_content;
        echo "<hr style='margin: 2rem 0; border-color: var(--border-color);'>";
        echo '<a href="blog.php" class="btn btn-secondary" style="margin-right:10px;">Back to Blog List</a>';
        echo '<a href="../index.html#blog" class="btn">Back to Homepage</a>';
        echo "</div></body></html>";

    } else {
        echo "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Post Not Found</title><link rel='stylesheet' href='../style.css'></head><body><div class='container' style='padding-top:20px;'>";
        echo "<h1>Post not found!</h1>";
        echo '<a href="blog.php">Back to Blog List</a>';
    }
} else {
    // Display list of all posts
    $all_posts = get_all_posts();

    // Output basic HTML structure for the blog listing page
    echo "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    echo "<title>My Blog - All Posts</title>";
    echo "<link rel='stylesheet' href='../style.css'>"; // Link to the main stylesheet
    echo "<style>
            body { padding-top: 20px; } /* Add some top padding */
            .blog-list-container { max-width: 900px; margin: 20px auto; }
            .blog-list-item { background-color: var(--surface-color); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 5px var(--shadow-color); }
            .blog-list-item h2 { margin-bottom: 0.5rem; font-size: 1.6rem;}
            .blog-list-item h2 a { color: var(--on-surface-color); }
            .blog-list-item h2 a:hover { color: var(--primary-color); }
            .post-excerpt-list { font-size: 0.95rem; color: var(--medium-emphasis-text-color); margin-top: 0.5rem; }
          </style>";
    echo "</head><body>";
    echo "<div class='container blog-list-container'>"; // Apply container for consistent width
    echo "<h1>All Blog Posts</h1>";

    if (!empty($all_posts)) {
        foreach ($all_posts as $post) {
            echo "<div class='blog-list-item'>";
            echo "<h2><a href='blog.php?post=" . urlencode($post['filename']) . "'>" . htmlspecialchars(str_replace(['-', '_'], ' ', $post['title'])) . "</a></h2>";
            // Placeholder for excerpt - could be generated by reading first N lines of MD file
            // echo "<p class='post-excerpt-list'>This is a short preview of the post...</p>";
            echo "</div>";
        }
    } else {
        echo "<p>No blog posts found.</p>";
    }
    echo "<hr style='margin: 2rem 0;'>";
    echo '<a href="../index.html#blog" class="btn">Back to Homepage Portfolio</a>';
    echo "</div></body></html>"; // Close container and body
}

// This was the old way of linking back, now incorporated into the HTML structure above.
// echo '<br><p><a href="../index.html#blog">Back to Homepage</a></p>';

?>
