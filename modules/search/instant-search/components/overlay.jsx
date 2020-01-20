/** @jsx h */

/**
 * External dependencies
 */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';

/**
 * Internal dependencies
 */
import Gridicon from './gridicon';

const closeOnEscapeKey = callback => event => {
	event.key === 'Escape' && callback();
};

const Overlay = ( { isVisible, closeOverlay, children } ) => {
	useEffect( () => {
		window.addEventListener( 'keydown', closeOnEscapeKey( closeOverlay ) );
		return () => {
			// Cleanup after event
			window.removeEventListener( 'keydown', closeOnEscapeKey( closeOverlay ) );
		};
	}, [] );

	const classNames = [ 'jetpack-instant-search__overlay' ];
	if ( ! isVisible ) {
		classNames.push( 'is-hidden' );
	}

	return (
		<div className={ classNames.join( ' ' ) }>
			<button className="jetpack-instant-search__overlay-close" onClick={ closeOverlay }>
				<Gridicon icon="cross" size="24" />
			</button>
			{ children }
		</div>
	);
};

export default Overlay;
