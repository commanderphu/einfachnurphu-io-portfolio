import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allProjects, type Project } from ".contentlayer/generated"
import { buildMetadata } from "@/lib/seo"
import Mdx from "@/components/mdx/Mdx"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug)
  if (!project) return {}
  return buildMetadata({
    title: project.title,
    description: project.summary ?? "",
    cover: project.cover,
    slug: `/projects/${project.slug}`,
  })
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project: Project | undefined = allProjects.find((p) => p.slug === slug)
  if (!project) return notFound()

  return (
    <article className="prose prose-invert mx-auto pb-20 px-4">
      <h1 className="mb-2 text-3xl font-bold">{project.title}</h1>
      <p className="text-sm text-white/60">
        {new Date(project.date).toLocaleDateString("de-DE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <Mdx code={project.body.code} />
    </article>
  )
}

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }))
}
