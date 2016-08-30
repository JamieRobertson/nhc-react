import React from 'react';
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

export default SearchInput;