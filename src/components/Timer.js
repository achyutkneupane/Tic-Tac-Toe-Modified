import React from 'react'

export default function Timer(time) {
  return (
    <React.Fragment>
        { Date(time * 1000).toISOString().slice(14, 19) }
    </React.Fragment>
  )
}
