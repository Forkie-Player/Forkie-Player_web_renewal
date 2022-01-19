import React from 'react'
import SingleLapseIndicator from '../elements/SingleLapseIndicator'

interface IProps {
  styles: React.CSSProperties[]
  range: number[]
}

const LapseIndicatorView = ({ styles, range }: IProps) => {
  return (
    <>
      {styles.map((style, index) => (
        <SingleLapseIndicator props={{ style: style }} second={range[index]} />
      ))}
    </>
  )
}

export default LapseIndicatorView
