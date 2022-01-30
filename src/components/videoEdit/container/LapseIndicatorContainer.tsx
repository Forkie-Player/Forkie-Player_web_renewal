import React, { useCallback, useEffect, useState } from 'react'
import LapseIndicatorView from '../view/LapseIndicatorView'

interface IProps {
  range: number[]
  updateIndicator: number
  refs: React.RefObject<HTMLDivElement>[]
}

function LapseIndecatorContaier({ updateIndicator, range, refs }: IProps) {
  const [startLapseIndicatorStyle, setStartLapseIndicatorStyle] = useState<React.CSSProperties>({ position: 'fixed' })
  const [endLapseIndicatorStyle, setEndLapseIndicatorStyle] = useState<React.CSSProperties>({ position: 'fixed' })

  const setIndecatorStyles = useCallback(() => {
    const leftBounding = refs[0].current?.getBoundingClientRect()
    const rightBounding = refs[1].current?.getBoundingClientRect()
    if (leftBounding !== undefined && rightBounding !== undefined) {
      setStartLapseIndicatorStyle({
        position: 'fixed',
        left: leftBounding.x,
        top: leftBounding.y - 45,
      })
      setEndLapseIndicatorStyle({
        position: 'fixed',
        left: rightBounding.x,
        top: rightBounding.y - 45,
      })
    }
  }, [refs])

  useEffect(() => {
    setIndecatorStyles()
  }, [updateIndicator, setIndecatorStyles])

  return <LapseIndicatorView styles={[startLapseIndicatorStyle, endLapseIndicatorStyle]} range={range} />
}

export default React.memo(LapseIndecatorContaier)
