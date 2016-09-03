// Node modules
import React from 'react';
import ClassNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
// Our own components
import Header from './components/Header';
import MarkerList from './components/MarkerList';
import MapTiles from './components/MapTiles';
import InfoBubble from './components/InfoBubble';
import Countdown from './components/Countdown';
import { CloseIconSVG } from './components/ButtonIconSVG';


export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0, 
            infoBubbleIsOpen: false, 
            sidebarIsOpen: false, 
            isMouseDown: false,
            isDragging: false, 
            zoom: 1, 
            offsetLeft: -640 + (window.innerWidth / 2), 
            offsetTop: -640 + (window.innerHeight / 2)
        };

        // Offsets: map is 1280x1280 
        // so find center: -640x-640
        // then add screen width and height

        this.updateIndex = this.updateIndex.bind(this);
        this.toggleInfoBubble = this.toggleInfoBubble.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.onMapDragStart = this.onMapDragStart.bind(this);
        this.onMapDrag = this.onMapDrag.bind(this);
        this.onMapDragEnd = this.onMapDragEnd.bind(this);
    }

    centerMap() {
        // Update state.offsets
        // transform: translate3d(-92px, -1px, 0px);
    }

    componentDidMount() {
        // getWindowWidth();
        // TODO: Handle touchstart
        // See this: https://www.npmjs.com/package/react-onclickoutside
        // window.document.addEventListener('mousedown', function() {
        //  console.log('body clicked');
        // });
    }
    
    updateIndex(newIndex) {
        this.setState({activeIndex: newIndex});
    }

    toggleInfoBubble(newState) {
        this.setState({infoBubbleIsOpen: newState});
    }

    toggleSidebar(event, newState) {
        event.preventDefault();
        // event.persist();
        if (newState !== undefined) {
            this.setState({sidebarIsOpen: newState});
        } else {
            this.setState({sidebarIsOpen: !this.state.sidebarIsOpen});
        }
    }

    onMapDrag(e) {
        if (this.state.isMouseDown) {
            console.log('e.screenX ' + e.screenX);
            console.log('e.clientX ' + e.clientX);    
        }
        // console.log(e.target);
        // console.log('foo');
        // console.log('e.screenX ' + e.screenX);
        // console.log('e.screenY ' + e.screenY);
        // console.log('e.clientX ' + e.clientX);
        // console.log('e.clientY ' + e.clientY);
        // this.setState({isDragging: true});
    }

    onMapDragStart(e) {
        console.log('onMapDragStart');
        this.setState({isMouseDown: true});
    }

    onMapDragEnd(e) {
        console.log('onMapDragEnd');
        this.setState({isMouseDown: false});   
    }

    render() {
        let { data } = this.props;
        let { sidebarIsOpen } = this.state;
        let sidebarClasses = ClassNames({
            'sidebar-active': sidebarIsOpen, 
            'sidebar-hidden': !sidebarIsOpen
        });
        let mapClasses = {
            transform: 'translate3d('+ this.state.offsetLeft +'px, '+ this.state.offsetTop +'px, 0px)'
        }

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
                    <i className='icon close' onClick={this.toggleSidebar}><CloseIconSVG fillColor='#eeeeee' /></i>
                </aside>
                <div className='content-wrap'>
                    <div className='content'>
                        <Header
                            toggleSidebar={this.toggleSidebar}
                            {...this.props}
                            {...this.state}
                        />
                        <div 
                            className='map'
                            // onDragStart={this.onMapDragStart}
                            onMouseDown={this.onMapDragStart}
                            onMouseMove={this.onMapDrag}
                            onMouseUp={this.onMapDragEnd}
                            style={mapClasses}
                        >
                            <MarkerList 
                                updateIndex={this.updateIndex}
                                toggleInfoBubble={this.toggleInfoBubble}
                                toggleSidebar={this.toggleSidebar}
                                {...this.props}
                                {...this.state}
                            />
                            <MapTiles 
                                {...this.props}
                                {...this.state}
                            />
                        </div>
                        <InfoBubble 
                            toggleInfoBubble={this.toggleInfoBubble}
                            updateIndex={this.updateIndex}
                            {...this.props}
                            {...this.state}
                        />
                        <Countdown />
                    </div>
                </div>
            </div>
        );
    }
}
