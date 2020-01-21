<?php
/**
 * Plugin Name: Jetpack E2E plan data interceptor
 * Plugin URI: https://github.com/automattic/jetpack
 * Author: Jetpack Team
 *
 * @package jetpack-test-plugin-e2e-plan-data
 * @version 1.0
 */

add_filter( 'pre_http_request', 'e2e_intercept_plan_data_request', 10, 3 );

function e2e_intercept_plan_data_request( $return, $r, $url ) {
	$site_id = Jetpack_Options::get_option( 'id' );

	// shortcut the api call...
  if( false !== stripos( $url, sprintf( '/sites/%d?', $site_id ) ) ) {

		$plan_data = get_option( 'e2e_jetpack_plan_data' );
		if (empty( $plan_data) ) {
			return $return;
		}

    return [
      'response' => [ 'code' => 200 ],
      'body' => $plan_data,
    ];
  }
  return $return;
}
