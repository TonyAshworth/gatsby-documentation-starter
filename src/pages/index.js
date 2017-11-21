import graphql from 'graphql-tag';
import Helmet from 'react-helmet';
import React from 'react';
import VerticalNavigationList from '../components/VerticalNavigationList';

const App = ({
                 data: {
                     allMarkdownRemark,
                     site,
                 },
                 searchIndex,
             }) => {
    console.log("allMarkdownRemark", allMarkdownRemark);
    return (
        <div className={'master-detail-container'}>
            <Helmet
                title={`Home - ${site.siteMetadata.title}`}
            />
            <div className={'master-pane'}>
                <VerticalNavigationList
                    currentSlug={'/'}
                    edges={allMarkdownRemark.edges}
                    searchIndex={searchIndex}
                />
            </div>
            <div className={'detail-pane'}>
                {site.siteMetadata.description}
            </div>
        </div>
    );
};

export default App;

export const query = graphql`query
IndexPageQuery {
    site {
        siteMetadata {
            title
            description
        }
    }
    allMarkdownRemark {
        edges {
            node {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                }
                headings {
                    depth
                    value
                }
            }
        }
    }
}`;