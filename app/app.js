import React from 'react';
import ClassNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Awesomplete from 'awesomplete';


class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        let { data } = this.props;
        // Convert names in data to array
        this.namesAsArray = data.map((value) => { return value.name });
    }

    componentDidMount() {
        // Init Awesomplete with custom options and new array of names
        // For events + API see http://leaverou.github.io/awesomplete/#events 
        let awesomplete = new Awesomplete(this._input);
        awesomplete.minChars = 1;
        awesomplete.maxItems = 6;
        awesomplete.list = this.namesAsArray;
    }

    render() {
        // ref attribute is a dom reference to the input element
        return (
            <div className='search'>
                <input 
                    ref={ (c) => this._input = c }
                    type='text' placeholder='Search' 
                />
            </div>
        );
    }
}

class Header extends React.Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let { toggleSidebar } = this.props;
        toggleSidebar(event);
    }

    render() {
        return (
            <header>
                <button
                    className='icon menu'
                    onClick={this.handleClick}
                ></button>
                <SearchInput 
                    {...this.props}
                />
                {/* <h1>NHC</h1> */}
            </header>
        )
    }
}

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
        let markerNodes = data.map((object, i) => {
            // console.log(this);
            let index = i+1;
            let type = object.type != undefined ? object.type : '';
            let name = data[i].name;

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

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0, 
            infoBubbleIsOpen: false, 
            sidebarIsOpen: false
        };

        this.updateIndex = this.updateIndex.bind(this);
        this.toggleInfoBubble = this.toggleInfoBubble.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    componentDidMount() {
        // TODO: Handle touchstart
        // See this: https://www.npmjs.com/package/react-onclickoutside
        // window.document.addEventListener('mousedown', function() {
        //  console.log('body clicked');
        // });
    }
    
    updateIndex(newIndex) {
        this.setState({activeIndex: newIndex})
    }

    toggleInfoBubble(newState) {
        this.setState({infoBubbleIsOpen: newState})
    }

    toggleSidebar(event, newState) {
        // console.log(event);
        // console.log(newState);
        event.preventDefault();
        // event.persist();
        if (newState !== undefined) {
            this.setState({sidebarIsOpen: newState})
        } else {
            this.setState({sidebarIsOpen: !this.state.sidebarIsOpen});
        }
    }

    render() {
        let { data } = this.props;
        let { sidebarIsOpen } = this.state;
        let sidebarClasses = ClassNames({
            'sidebar-active': sidebarIsOpen, 
            'sidebar-hidden': !sidebarIsOpen
        });

        if (!data) {
            return <i className='icon loading'></i>;
        }

        return( 
            <div
                className={'container ' + sidebarClasses}
            >
                <aside className='sidebar'>
                    <nav>
                        <MarkerList 
                            updateIndex={this.updateIndex}
                            toggleInfoBubble={this.toggleInfoBubble}
                            toggleSidebar={this.toggleSidebar}
                            {...this.props}
                            {...this.state}
                        />
                    </nav>
                    <button
                        className='icon close'
                        onClick={this.toggleSidebar}
                    ></button>
                </aside>
                <div className='content-wrap'>
                    <div className='content'>
                        <Header
                            toggleSidebar={this.toggleSidebar}
                            {...this.props}
                            {...this.state}
                        />
                        <MarkerList 
                            updateIndex={this.updateIndex}
                            toggleInfoBubble={this.toggleInfoBubble}
                            toggleSidebar={this.toggleSidebar}
                            {...this.props}
                            {...this.state}
                        />
                        <InfoBubble 
                            toggleInfoBubble={this.toggleInfoBubble}
                            {...this.props}
                            {...this.state}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
