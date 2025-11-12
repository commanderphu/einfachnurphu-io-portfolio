'use client'

import { ComponentPropsWithoutRef } from 'react'
import * as runtime from 'react/jsx-runtime'
import Callout from './Callout'
import Image from 'next/image'
import Embed from './Embed'

const components = {
  Callout,
  Embed,
  Image: (props: ComponentPropsWithoutRef<typeof Image>) => (
    <Image {...props} className="rounded-lg my-6" alt={props.alt || ''} />
  ),
}

interface MdxProps {
  body: string
}

export function Mdx({ body }: MdxProps) {
  // Velite kompiliert zu einem Function der JSX Runtime als arguments[0] erwartet
  // eslint-disable-next-line no-new-func
  const getMDXComponent = new Function(body)
  const { default: Component } = getMDXComponent(runtime)

  return <Component components={components} />
}

export default Mdx