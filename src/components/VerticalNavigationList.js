import React from 'react';
import NavigationItem from './NavigationItem';

const VerticalNavigationList = ({
                                    edges,
                                    currentSlug,
                                }) => (
    <nav>
        <dl>
            {edges
                .sort((a,b) => a.node.frontmatter.titleOrder - b.node.frontmatter.titleOrder)
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
);

export default VerticalNavigationList;