import React from 'react'
import { PositionedEvent } from '../utils/layout'

const Event: React.FC<{ event: PositionedEvent }> = ({ event }) => {
    return (
        <div
            className='absolute bg-white border-l-4 border-black shadow-md p-2 text-xs'
            style={{
                top: (event.start / 720) * 720,
                height: ((event.end - event.start) / 720) * 720,
                left: event.left,
                width: event.width
            }}
        >
            <strong>{event.title}</strong>
            <p className='text-gray-500 text-xs'>Sample Location</p>
        </div>
    )
}

export default Event