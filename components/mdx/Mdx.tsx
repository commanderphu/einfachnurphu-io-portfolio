"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import OGPreview from "@/components/mdx/OGPreview"
import Callout from "@/components/mdx/Callout"
import { Steps, Step } from "@/components/mdx/Steps"
import type { MDXComponents } from "mdx/types"

type MdxProps = {
  code: string
  components?: MDXComponents
}

const baseComponents: MDXComponents = {
  OGPreview,
  Callout,
  Steps,
  Step,
}

export default function Mdx({ code, components }: MdxProps) {
  const Component = useMDXComponent(code)
  const merged = { ...baseComponents, ...components }

  return (
    <div className="prose prose-invert max-w-none">
      <Component components={merged} />
    </div>
  )
}
