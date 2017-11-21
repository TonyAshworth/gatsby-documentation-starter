import graphql from 'graphql-tag';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import './index.css';
import './../icons/octicons.css';
import githubIcon from './../icons/svg/mark-github.svg';

const Header = ({title, githubLink}) => {

    return (
        <div className="top-header">
            <div className="header-text">
                <h1>
                    <Link to="/">
                        {title}
                    </Link>
                </h1>
            </div>
            <div className="github-link">
                <a target="_blank" href={githubLink} data-test="TEST">
                    <img src={githubIcon} alt="GitHub Link"/>
                </a>
            </div>
        </div>
    );
};

const TemplateWrapper = (props) => {
    const {
        children,
        data: {
            site,
            siteSearchIndex,
        },
    } = props;

    return (
        <div>
            <Helmet
                title={site.siteMetadata.title}
                meta={[
                    {name: 'description', content: site.siteMetadata.description},
                ]}
            />
            <Header title={site.siteMetadata.title} githubLink={site.siteMetadata.githubUrl}/>
            <div>
                {children({
                    ...props,
                    searchIndex: siteSearchIndex.index,
                })}
            </div>
        </div>
    );
};

TemplateWrapper.propTypes = {
    children: PropTypes.func,
};

export default TemplateWrapper;
export const query = graphql`query
TemplateQuery {
    site {
        siteMetadata {
            description
            title
            githubUrl
        }
    }
    siteSearchIndex {
      index
    }
}`;