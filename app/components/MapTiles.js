import React from 'react';
import ClassNames from 'classnames';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			isImageLoaded: false
		};
		this.imageOnLoad = this.imageOnLoad.bind(this);
	}

	imageOnLoad() {
		this.setState({ isImageLoaded: true });
	}

	render() {
		let imageClasses = ClassNames('map-tile', {
			'loaded': this.state.isImageLoaded
		});

		return(
			<img 
				src={this.props.src}
				className={imageClasses}
				onLoad={this.imageOnLoad}
				style={this.props.inlineStyles}
			/>
		);
	}
}

class MapTiles extends React.Component {
	render() {
		let { tiles, zoom } = this.props;

		let tileNodes = tiles[zoom].map((object, i) => {
			let src = object.src;
			let inlineStyles = {
				left: object.position[0], 
				top: object.position[1]
			}

			return(
				<Tile 
					key={i}
					src={src}
					inlineStyles={inlineStyles}
					{...this.props}
					{...this.state}
				/>
			);
		});

		return(
			<div className='map-tiles-container'>
				{tileNodes}
			</div>
		);
	}
}

export default MapTiles;