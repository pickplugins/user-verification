<?php
if (!defined('ABSPATH'))
	exit();



class UserVerificationRest
{
	function __construct()
	{
		add_action('rest_api_init', array($this, 'register_routes'));
	}


	public function register_routes()
	{






		register_rest_route(
			'user-verification/v2',
			'/update_options',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'update_options'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);





		register_rest_route(
			'user-verification/v2',
			'/get_options',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_options'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);




		register_rest_route(
			'user-verification/v2',
			'/get_posts',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_posts'),
				'permission_callback' => '__return_true',

			)
		);
	}





	/**
	 * Return update_options
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function update_options($request)
	{
		$response = [];


		$name = isset($request['name']) ? sanitize_text_field($request['name']) : '';
		$value = isset($request['value']) ? user_verification_recursive_sanitize_arr($request['value']) : '';
		$message = "";
		if (!empty($value)) {
			$status = update_option($name, $value);
			$message = __("Options updated", "user-verification");
		} else {
			$status = false;
			$message = __("Value should not empty", "user-verification");
		}


		$response['status'] = $status;
		$response['message'] = $message;

		die(wp_json_encode($response));
	}





	/**
	 * Return get_options
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_options($request)
	{
		$response = [];


		$option = isset($request['option']) ? $request['option'] : '';

		error_log($option);

		$response = get_option($option);

		error_log(serialize($response));

		die(wp_json_encode($response));
	}





	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_posts($post_data)
	{
		$query_args = [];


		$nonce = isset($post_data['_wpnonce']) ? $post_data['_wpnonce'] : "";


		if (!wp_verify_nonce($nonce, 'wp_rest')) return $query_args;



		$queryArgs = isset($post_data['queryArgs']) ? $post_data['queryArgs'] : [];
		error_log(serialize($queryArgs));
		$rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
		$rawData = !empty($post_data['rawData']) ? $post_data['rawData'] : $rawData;

		$prevText = !empty($post_data['prevText']) ? $post_data['prevText'] : "";
		$nextText = !empty($post_data['nextText']) ? $post_data['nextText'] : "";
		$maxPageNum = !empty($post_data['maxPageNum']) ? $post_data['maxPageNum'] : 0;


		$paged = 1;





		if (is_array($queryArgs))
			foreach ($queryArgs as $item) {



				$id = isset($item['id']) ? $item['id'] : '';
				$val = isset($item['val']) ? $item['val'] : '';



				if ($val) {
					if ($id == 'postType') {
						$query_args['post_type'] = $val;
					} elseif ($id == 'postStatus') {




						if (($key = array_search("draft", $val)) !== false) {
							unset($val[$key]);
						}
						if (($key = array_search("auto-draft", $val)) !== false) {
							unset($val[$key]);
						}

						if (($key = array_search("future", $val)) !== false) {
							unset($val[$key]);
						}





						$status =  $val;
						$query_args['post_status'] = $status;

						// $query_args['post_status'] = $val;
					} elseif ($id == 'order') {
						$query_args['order'] = $val;
					} elseif ($id == 'orderby') {
						$query_args['orderby'] = implode(' ', $val);
					} elseif ($id == 'metaKey') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'dateQuery') {


						$date_query = [];

						foreach ($val as $arg) {
							$id = isset($arg['id']) ? $arg['id'] : '';
							$value = isset($arg['value']) ? $arg['value'] : '';


							if ($id == 'year' || $id == 'month' || $id == 'week' || $id == 'day' || $id == 'hour' || $id == 'minute' || $id == 'second') {
								$compare = isset($arg['compare']) ? $arg['compare'] : '';

								if (!empty($value))
									$date_query[] = [$id => $value, 'compare' => $compare,];
							}


							if ($id == 'inclusive' || $id == 'compare' || $id == 'relation') {

								if (!empty($value))
									$date_query[$id] = $value;
							}

							if ($id == 'after' || $id == 'before') {
								$year = isset($arg['year']) ? $arg['year'] : '';
								$month = isset($arg['month']) ? $arg['month'] : '';
								$day = isset($arg['day']) ? $arg['day'] : '';

								if (!empty($year))
									$date_query[$id]['year'] = $year;

								if (!empty($month))
									$date_query[$id]['month'] = $month;

								if (!empty($day))
									$date_query[$id]['day'] = $day;
							}
						}



						$query_args['date_query'] = $date_query;
					} elseif ($id == 'year') {



						$query_args['year'] = $val;
					} elseif ($id == 'monthnum') {
						$query_args['monthnum'] = $val;
					} elseif ($id == 'w') {
						$query_args['w'] = $val;
					} elseif ($id == 'day') {
						$query_args['day'] = $val;
					} elseif ($id == 'hour') {
						$query_args['hour'] = $val;
					} elseif ($id == 'minute') {
						$query_args['minute'] = $val;
					} elseif ($id == 'second') {
						$query_args['second'] = $val;
					} elseif ($id == 'm') {
						$query_args['m'] = $val;
					} elseif ($id == 'author') {


						$query_args['author'] = $val;
					} elseif ($id == 'authorName') {
						$query_args['author_name'] = $val;
					} elseif ($id == 'authorIn') {
						$query_args['author_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'authorNotIn') {
						$query_args['author__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'cat') {
						$query_args['cat'] = $val;
					} elseif ($id == 'categoryName') {
						$query_args['category_name'] = $val;
					} elseif ($id == 'categoryAnd') {
						$query_args['category_and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'categoryIn') {
						$query_args['category__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'categoryNotIn') {
						$query_args['category__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tag') {
						$query_args['tag'] = $val;
					} elseif ($id == 'tagId') {
						$query_args['tag_id'] = $val;
					} elseif ($id == 'tagAnd') {
						$query_args['tag__and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagIn') {
						$query_args['tag__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagNotIn') {
						$query_args['tag__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagSlugAnd') {
						$query_args['tag_slug__and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagSlugIn') {
						$query_args['tag_slug__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'taxQuery') {
						$query_args['tax_query'] = $val[0];
					} elseif ($id == 'p') {
						$query_args['p'] = $val;
					} elseif ($id == 'name') {
						$query_args['name'] = $val;
					} elseif ($id == 'pageId') {
						$query_args['page_id'] = $val;
					} elseif ($id == 'pagename') {
						$query_args['pagename'] = $val;
					} elseif ($id == 'postParent') {
						$query_args['post_parent'] = $val;
					} elseif ($id == 'postParentIn') {
						$query_args['post_parent__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postParentNotIn') {
						$query_args['post_parent__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postIn') {


						$query_args['post__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postNotIn') {
						$query_args['post__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postNameIn') {
						$query_args['post_name__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'hasPassword') {

						$query_args['has_password'] = ($val === 'true') ? true : false;;
					} elseif ($id == 'postPassword') {
						$query_args['post_password'] = $val;
					} elseif ($id == 'commentCount') {
						$query_args['comment_count'] = $val;
					} elseif ($id == 'nopaging') {
						$query_args['nopaging'] = $val;
					} elseif ($id == 'postsPerPage') {

						$per_page = (int) $val;
						$per_page = ($val > 10) ? 10 : $val;
						$query_args['posts_per_page'] = $per_page;

						// $query_args['posts_per_page'] = $val;
					} elseif ($id == 'paged') {
						$paged = $val;
						$query_args['paged'] = $val;
					} elseif ($id == 'offset') {
						$query_args['offset'] = $val;
					} elseif ($id == 'postsPerArchivePage') {
						$query_args['posts_per_archive_page'] = $val;
					} elseif ($id == 'ignoreStickyPosts') {
						$query_args['ignore_sticky_posts'] = $val;
					} elseif ($id == 'metaKey') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'metaValue') {
						$query_args['meta_value'] = $val;
					} elseif ($id == 'metaValueNum') {
						$query_args['meta_value_num'] = (int) $val;
					} elseif ($id == 'metaCompare') {
						$query_args['meta_compare'] = $val;
					} elseif ($id == 'metaQuery') {
						$query_args['meta_query'] = $val;
					} elseif ($id == 'perm') {
						$query_args['perm'] = $val;
					} elseif ($id == 'postMimeType') {
						$query_args['post_mime_type'] = $val;
					} elseif ($id == 'cacheResults') {
						$query_args['cache_results'] = $val;
					} elseif ($id == 'updatePostMetaCache') {
						$query_args['update_post_meta_cache '] = $val;
					} elseif ($id == 'updatePostTermCache') {
						$query_args['update_post_term_cache'] = $val;
					}
				}
			}


		$posts = [];
		$responses = [];


		$post_grid_wp_query = new WP_Query($query_args);




		if ($post_grid_wp_query->have_posts()) :

			$responses['noPosts'] = false;


			while ($post_grid_wp_query->have_posts()) :
				$post_grid_wp_query->the_post();

				global $post;

				$post_id = $post->ID;
				$post->post_id = $post->ID;
				$post->post_title = $post->post_title;
				$post->post_excerpt = wp_kses_post($post->post_excerpt);
				$post->post_content = $post->post_content;
				$thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
				$thumb_url = isset($thumb[0]) ? $thumb[0] : '';
				$post->thumb_url = !empty($thumb_url) ? $thumb_url : post_grid_plugin_url . 'assets/images/placeholder.png';

				$post->is_pro = ($post_id % 2 == 0) ? true : false;


				$blocks = parse_blocks($rawData);

				$html = '';

				foreach ($blocks as $block) {
					//look to see if your block is in the post content -> if yes continue past it if no then render block as normal
					$html .= render_block($block);
				}

				$post->html = $html;

				$posts[] = $post;




			endwhile;


			$big = 999999999; // need an unlikely integer

			$maxPageNum = (!empty($maxPageNum)) ? $maxPageNum : $post_grid_wp_query->max_num_pages;



			$pages = paginate_links(
				array(
					'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
					'format' => '?paged=%#%',
					'current' => max(1, $paged),
					'total' => $maxPageNum,
					'prev_text' => $prevText,
					'next_text' => $nextText,
					'type' => 'array',

				)
			);





			$responses['posts'] = $posts;
			$responses['pagination'] = $pages;

			wp_reset_query();
			wp_reset_postdata();
		else :
			$responses['noPosts'] = true;

		endif;


		die(wp_json_encode($responses));
	}
}

$AccordionsRest = new UserVerificationRest();
