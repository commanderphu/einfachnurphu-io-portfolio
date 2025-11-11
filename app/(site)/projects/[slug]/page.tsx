import { notFound } from "next/navigation"
import { projects } from "#site/content"
import { Mdx } from "@/components/mdx/Mdx"  // ✅ Named import

export const dynamic = "force-dynamic"
export const revalidate = 0

type Project = typeof projects[number]

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project: Project | undefined = projects.find((p) => p.slug === slug)

  if (!project) {
    return notFound()
  }

  return (
    <article className="relative mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
          {project.title}
        </h1>
        {project.summary && (
          <p className="text-lg text-white/70">{project.summary}</p>
        )}
      </header>

      <div className="mdx-content">
        <Mdx body={project.body} />
      </div>
    </article>
  )
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) return {}

  return {
    title: project.title,
    description: project.summary ?? "",
  }
}