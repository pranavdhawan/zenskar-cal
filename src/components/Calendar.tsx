import React from 'react'
import { sampleEvents } from '../data/events'
import { arrangeEvents } from '../utils/layout'
import Event from './Event'

const Calendar: React.FC = () => {
    const positionedEvents = arrangeEvents(sampleEvents)
    return (
        <div className='relative w-[620px] h-[720px] border bg-gray-100'>
            {positionedEvents.map((event, index) => (
                <Event key={index} event={event} />
            ))}
        </div>
    )
}

export default Calendar