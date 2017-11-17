import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

class NavigationDetailItem extends React.Component {
    render () {
        const {
            item,
            index,
            shortcut,
        } = this.props;

        const getUrlFromTitle = (title) => {
            const reformattedTitle = title.toLowerCase().replace(' ', '-');
            return `/doc/${shortcut}#${reformattedTitle}`;
        };

        return <dd className={`depth-${item.depth}`} key={index}>
            <Link to={getUrlFromTitle(item.value)}>
                {item.value}
            </Link>
        </dd>
    }
}

NavigationDetailItem.defaultProps = {
	item: {},
};

export default NavigationDetailItem;