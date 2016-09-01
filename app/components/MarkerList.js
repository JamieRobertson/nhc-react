import React from 'react';
import ClassNames from 'classnames';

class Marker extends React.Component {
    handleClick() {
        let { index, updateIndex, infoBubbleIsOpen, toggleInfoBubble, sidebarIsOpen, toggleSidebar } = this.props;
        // Update index of data
        updateIndex(index);
        // Show infoBubble
        if (!infoBubbleIsOpen) { toggleInfoBubble(true) };
        // Hide sidebar
        if (sidebarIsOpen) { toggleSidebar(event, false) };
    }

    render() {
        let iconType = 'icon-'+this.props.type;
        let classes = ClassNames('marker', iconType, {
            'active': this.props.index === this.props.activeIndex
        });

        return (
            <li 
                onClick={this.handleClick.bind(this)} 
                className={classes}
            >
            {this.props.name}
            </li>
        );
    }
}

class MarkerList extends React.Component {
    render() {
        let { data } = this.props;

        // Using fat arrow to preserve 'this'
        let markerNodes = data.soundsystems.map((object, i) => {
            // console.log(this);
            let index = i+1;
            let type = object.type != undefined ? object.type : '';
            // let name = data[i].name;
            let name = object.name;

            return (
                <Marker 
                    key={i} 
                    index={index}
                    name={name}
                    type={type}
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

export default MarkerList;