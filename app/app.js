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
            zoom: 1
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
                    <i className='icon close' onClick={this.toggleSidebar}><CloseIconSVG fillColor='#eeeeee' /></i>
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
                        <MapTiles 
                            {...this.props}
                            {...this.state}
                        />
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
