/// <reference types="vite/client" />
/// <reference types="vite-plugin-sgvr/client" />

declare module '*.svg?react' {
  import React from 'react'
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
