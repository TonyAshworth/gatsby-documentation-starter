const path = require(`path`);

module.exports = {
    siteMetadata: {
        title: `Gatsby Documentation Starter`,
        description: `A gatsby documentation starter website based upon markdown files.`,
        githubUrl: `https://github.com/TonyAshworth/gatsby-documentation-starter`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: path.resolve(__dirname, `docs`),
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-autolink-headers`,
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            destinationDir: 'assets',
                            ignoreFileExtensions: [],
                        }
                    },
                ],
            },
        },
        {
            resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
            options: {
                fields: [
                    'title',
                ],
                resolvers: {
                    MarkdownRemark: {
                        title: node => node.frontmatter.title,
                    },
                },
            },
        },
    ],
};
