import * as React from 'react'
import { PerfectCursor } from 'perfect-cursors'

export function usePerfectCursor(cb: (point: [number, number]) => void, point?: [number, number]) {
  const [pc] = React.useState(() => new PerfectCursor(cb))

  React.useLayoutEffect(() => {
    if (point) pc.addPoint(point)
    return () => pc.dispose()
  }, [pc])

  const onPointChange = React.useCallback((point: [number, number]) => pc.addPoint(point), [pc])

  return onPointChange
}
