import React from 'react'
import styled from 'styled-components'

interface ImageProps {
  image: string
  width: number
  height: number
  cover?: boolean
  onClick?(): void
}

const Image = styled.div<ImageProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-image: url(${({ image }) => image});
  background-size: ${({ cover }) => (cover ? 'cover' : 'contain')};
  background-repeat: no-repeat;
  background-position: center;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
`

export default (props: ImageProps) => <Image {...props} />
