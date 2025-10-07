"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import OGPreview from "@/components/mdx/OGPreview"
import Callout from "@/components/mdx/Callout"
import { Steps, Step } from "@/components/mdx/Steps"

const mdxComponents = { OGPreview, Callout, Steps, Step }

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code)
  return (
    <div className="prose prose-invert max-w-none">
      <Component components={mdxComponents as any} />
    </div>
  )
}
