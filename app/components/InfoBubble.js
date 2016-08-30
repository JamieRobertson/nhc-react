import React from 'react';
import ClassNames from 'classnames';
import colors from './colors';
import { CloseIconSVG } from './ButtonIconSVG';

class InfoBubble extends React.Component {
    constructor() {
        super();
        
        this.closeBubble = this.closeBubble.bind(this);
    }

    // shouldComponentUpdate() {
    //  let { activeIndex } = this.props;
    //  console.log('add content');
    //  return !!activeIndex;
    // }

    closeBubble() {
        let { infoBubbleIsOpen, toggleInfoBubble } = this.props;
        if (infoBubbleIsOpen) { toggleInfoBubble(false) };
    }

    render() {
        let { activeIndex, data } = this.props;
        let classes = ClassNames('info-bubble', {
            'active': !!this.props.activeIndex && this.props.infoBubbleIsOpen, 
            'hidden': !this.props.infoBubbleIsOpen
        });
        let title = !!activeIndex ? data[activeIndex-1].name : '';
        let content = !!activeIndex ? data[activeIndex-1].description : '';

        return (
            <div 
                className={classes}
            >
                <h3>{title}</h3>
                <p>{content}</p>
                <i className='icon close' onClick={this.closeBubble}><CloseIconSVG fillColor='#2a2a2a' /></i>
            </div>
        );
    }
}

export default InfoBubble;