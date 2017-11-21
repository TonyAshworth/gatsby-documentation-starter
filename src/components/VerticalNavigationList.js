import React, {Component} from 'react';
import NavigationItem from './NavigationItem';
import PropTypes from 'prop-types';
import Search from '../components/Search';

class VerticalNavigationList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchResults: [],
        };
    }

    render() {
        const {
            currentSlug,
            edges,
            searchIndex,
        } = this.props;

        const {
            searchResults
        } = this.state;

        return (
            <div>
                <Search searchIndex={searchIndex} onSearch={this.setSearchFilter}/>
                <nav>
                    <dl>
                        {edges
                            .filter(forSearchResults(searchResults))
                            .map(({node}, index) => (
                                <div key={`nav-header-wrapper-${index}`}>
                                    {node.headings
                                        .filter((item) => item.depth === 1)
                                        .map((heading, index) => (
                                            <NavigationItem
                                                {...heading}
                                                key={`nav-item-${index}`}
                                                href={`${node.fields.slug}`}
                                            />
                                        ))}
                                    {node.fields.slug === currentSlug && node.headings
                                        .filter((item) => item.depth > 1)
                                        .map((heading, index) => (
                                            <NavigationItem
                                                {...heading}
                                                key={`nav-sub-item-${index}`}
                                                href={`${node.fields.slug}#${heading.value.toLowerCase().replace(/[ ]/g, '-')}`}
                                            />
                                        ))}
                                </div>
                            ))}
                    </dl>
                </nav>
            </div>
        );
    }

    setSearchFilter = (evt, query, searchResults) => {
        this.setState({
            searchResults,
        });
    }
}

VerticalNavigationList.propTypes = {
    searchIndex: PropTypes.object.isRequired,
};
export default VerticalNavigationList;

function forSearchResults(results) {
    return ({node}) => {
        return results.length === 0 || results.find(result => result.id === node.id);
    };
}