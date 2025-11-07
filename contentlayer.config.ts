import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    cover: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' } },
    repo: { type: 'string', required: false },
    demo: { type: 'string', required: false },
    date: { type: 'date', required: true },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/projects/${doc.slug}` },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    date: { type: 'date', required: true },
    cover: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' } },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/blog/${doc.slug}` },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, Post],
  disableImportAliasWarning: true, // optional
})
