import PropTypes from 'prop-types';
import qs from 'qs';
import React, {Component} from 'react';
import {Index} from 'elasticlunr';

const getSearch = ({location}) => {
    if (!location) return '';
    if (!location.search) return '';

    const query = location.search.substring(1);
    const parsed = qs.parse(query);
    if (!parsed.q) return '';
    return parsed.q;
};

class Search extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: getSearch(props),
        };
    }

    render() {
        const {
            query,
        } = this.state;

        return (
            <div>
                <input type="text" value={query} onChange={this.updateQuery}/>
            </div>
        );
    }

    updateQuery = evt => {
        const {
            onSearch,
        } = this.props;
        const text = evt.target.value;
        this.setState(s => {
            return {
                ...s,
                query: text,
            };
        });

        const query = getSearch(this.props);
        onSearch(evt, query, this.getHits(text));

    };

    createIndex = () => {
        this.index = Index.load(this.props.searchIndex);
    };

    getHits = (query) => {
        if (!query) return [];

        if (!this.index) this.createIndex();
        const hits = this.index.search(query);
        return hits.map(({
                             ref,
                         }) => this.index.documentStore.getDoc(ref));
    };
}

Search.propTypes = {
    searchIndex: PropTypes.object.isRequired,
    onSearch: PropTypes.func
};
Search.defaultProps = {
    onSearch: () => {
    }
};
export default Search