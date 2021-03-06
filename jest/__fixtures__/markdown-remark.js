'use strict';

module.exports = {
  markdownRemark: {
    id: 'test-123',
    html: '<p>test</p>',
    fields: {
      tagSlugs: [
        '/test_0',
        '/test_1'
      ]
    },
    frontmatter: {
      created: '2019-05-01',
      description: 'test',
      title: 'test',
      tags: [
        'test_0',
        'test_1'
      ],
      banner: {
        path: '/media/test.jpg',
        caption: 'test',
        link: "https://example.com/test"
      }
    }
  }
};
