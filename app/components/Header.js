import React from 'react';
import SearchInput from './SearchInput';
import { MenuIconSVG } from './ButtonIconSVG';

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
                <i className='icon menu' onClick={this.handleClick}><MenuIconSVG fillColor='#2a2a2a' /></i>                
                <SearchInput 
                    {...this.props}
                />
                {/* <h1>NHC</h1> */}
            </header>
        )
    }
}

export default Header;