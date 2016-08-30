// Node modules
import React from 'react';
import ClassNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
// Our own components
import Header from './components/Header';
import MarkerList from './components/MarkerList';
import InfoBubble from './components/InfoBubble';
import ButtonIconSVG from './components/ButtonIconSVG';


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
