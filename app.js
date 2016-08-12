import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import data from './data/data';


class InfoBubble extends React.Component {
	constructor() {
        super();
        
        this.closeBubble = this.closeBubble.bind(this);
    }

    // shouldComponentUpdate() {
    // 	let { activeIndex } = this.props;
    // 	console.log('add content');
    // 	return !!activeIndex;
    // }

	closeBubble() {
		let { infoBubbleIsOpen, toggleInfoBubble } = this.props;
		if (infoBubbleIsOpen) { toggleInfoBubble(false) };
	}

	render() {
		let { activeIndex, data } = this.props;
		let classes = ClassNames('info-bubble', {
			'active': !!this.props.activeIndex && this.props.infoBubbleIsOpen
		});
		let title = !!activeIndex ? data[activeIndex-1].name : '';
		let content = !!activeIndex ? data[activeIndex-1].description : '';

		return (
			<div 
				className={classes}
			>
				<h3>{title}</h3>
				<p>{content}</p>
				<button 
					className='icon close'
					onClick={this.closeBubble}
				></button>
			</div>
		);
	}
}

class Marker extends React.Component {
	handleClick() {
		let { index, updateIndex, infoBubbleIsOpen, toggleInfoBubble } = this.props;
		// Update index of data
		updateIndex(index);
		// Show infoBubble
		if (!infoBubbleIsOpen) { toggleInfoBubble(true) };
	}

	render() {
		let classes = ClassNames('marker', {
			'active': this.props.index === this.props.activeIndex
		});

		return (
			<li 
				onClick={this.handleClick.bind(this)} 
				className={classes}
			>
			o
			</li>
		);
	}
}

class MarkerList extends React.Component {
	render() {
		let { data } = this.props;

		// Using fat arrow to preserve 'this'
		let markerNodes = data.map((object, i) => {
			// console.log(this);
			let index = i+1;

			return (
				<Marker 
					key={i} 
					index={index}
					{...this.props}
					{...this.state}
				/>
			);
		});

		return (
			<ul 
				className='markers'
			>
				{markerNodes}
			</ul>
		);
	}
}

class App extends React.Component {
	constructor() {
        super();

        this.state = {
            activeIndex: 0, 
            infoBubbleIsOpen: false
        };
    }

	componentDidMount() {
		// TODO: Handle touchstart
		// See this: https://www.npmjs.com/package/react-onclickoutside
		// window.document.addEventListener('mousedown', function() {
		// 	console.log('body clicked');
		// });
	}
    
    updateIndex(newIndex) {
		this.setState({activeIndex: newIndex})
    }

    toggleInfoBubble(newState) {
    	this.setState({infoBubbleIsOpen: newState})
    }

    render() {
    	let { data } = this.props;

    	if (!data) {
			return <i className='icon loading'></i>;
		}

        return( 
        	<div
        		className='wrapper'
        	>
	        	<MarkerList 
	        		updateIndex={this.updateIndex.bind(this)}
	        		toggleInfoBubble={this.toggleInfoBubble.bind(this)}
	        		{...this.props}
	        		{...this.state}
	        	/>
	        	<InfoBubble 
	        		toggleInfoBubble={this.toggleInfoBubble.bind(this)}
					{...this.props}
					{...this.state}
				/>
        	</div>
        );
    }
}

ReactDOM.render(
    <App data={data} />, 
    document.getElementById('app')
);

