import React from 'react';
import ClassNames from 'classnames';
import colors from './colors';
import { CloseIconSVG } from './ButtonIconSVG';

class InfoBubble extends React.Component {
    constructor() {
        super();
        
        this.closeBubble = this.closeBubble.bind(this);
    }

    closeBubble() {
        let { updateIndex, infoBubbleIsOpen, toggleInfoBubble } = this.props;
        // Hide infoBubble
        if (infoBubbleIsOpen) { toggleInfoBubble(false) };
        // Deselect marker
        updateIndex(0);
    }

    render() {
        let { activeIndex, data } = this.props;
        let classes = ClassNames('info-bubble', {
            'active': !!this.props.activeIndex && this.props.infoBubbleIsOpen, 
            'hidden': !this.props.infoBubbleIsOpen
        });
        let title = !!activeIndex ? data.soundsystems[activeIndex-1].name : '';
        let content = !!activeIndex ? data.soundsystems[activeIndex-1].description : '';

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