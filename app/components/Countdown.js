import React from 'react';
import ClassNames from 'classnames';
import { TimeIconSVG } from './ButtonIconSVG';

// times are in UTC/GMT but what about daylight savings?

class Cowntdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	countdownIsOpen: false
        }
        this.timeLeft = '';
        this.calcTime = this.calcTime.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

	calcTime() {
		const day = 86400000; // milliseconds
		// 27th is day before bank holiday Monday
		let future = new Date('2017-08-27');
		let now = new Date();
		let numOfDays = Math.round((future - now) / day);

		if (numOfDays > 1) {
			this.timeLeft = numOfDays + ' days';
		} else if (numOfDays === 1) {
			this.timeLeft = numOfDays + ' day';
		} else { 
			this.timeLeft = 'It\'s carnival time baby!'; 
		}
	};

	handleClick() {
		this.calcTime();
		this.setState({countdownIsOpen: !this.state.countdownIsOpen});
	}

	render() {
		let countDownClass = ClassNames({
            'active': this.state.countdownIsOpen
        });

		return (
			<div 
				onClick={this.handleClick}
				className={'countdown ' + countDownClass}
			>
				<i className='icon countdown'><TimeIconSVG fillColor='#eeeeee' /></i>
				<h3>{this.timeLeft}</h3>
			</div>
		);
	}
}

export default Cowntdown;