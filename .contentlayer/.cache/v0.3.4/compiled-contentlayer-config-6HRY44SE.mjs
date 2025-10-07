// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    cover: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" } },
    repo: { type: "string", required: false },
    demo: { type: "string", required: false },
    date: { type: "date", required: true },
    featured: { type: "boolean", default: false }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/projects/${doc.slug}` }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    date: { type: "date", required: true },
    cover: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" } },
    published: { type: "boolean", default: true }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/blog/${doc.slug}` }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Post],
  disableImportAliasWarning: true
  // optional
});
export {
  Post,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-6HRY44SE.mjs.map
