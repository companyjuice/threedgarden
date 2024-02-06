import { setState } from '#/lib/threed/stores/store'
import { useEffect, useRef } from 'react'

const DocumentObjectModel = ({ children }) => {
  const ref = useRef(null)
  useEffect(() => {
    setState({ dom: ref })
  }, [])

  return (
    <div className='dom' ref={ref}>
      {children}
    </div>
  )
}

export default DocumentObjectModel
