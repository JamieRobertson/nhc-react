import React from 'react';
import SearchInput from './SearchInput';
import ButtonIconSVG from './ButtonIconSVG';

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

export default Header;