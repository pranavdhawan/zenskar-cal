import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useState } from 'react'

const localizer = momentLocalizer(moment)

const CustomToolbar = ({ label, onNavigate }: any) => (
    <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="text-xl font-semibold">{label}</div>
        <div className="space-x-2">
            <button
                onClick={() => onNavigate('PREV')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
                Previous
            </button>
            <button
                onClick={() => onNavigate('TODAY')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
                Today
            </button>
            <button
                onClick={() => onNavigate('NEXT')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
                Next
            </button>
        </div>
    </div>
)

const MyCalendar = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Meeting with Team',
            start: new Date(moment().hour(10).minute(0).second(0)),
            end: new Date(moment().hour(11).minute(30).second(0)),
        },
        {
            id: 2,
            title: 'Lunch Break',
            start: new Date(moment().hour(12).minute(0).second(0)),
            end: new Date(moment().hour(13).minute(0).second(0)),
        },
    ])

    const handleSelect = ({ start, end }: any) => {
        const title = window.prompt('New Event name')
        if (title) {
            setEvents([
                ...events,
                {
                    id: events.length + 1,
                    title,
                    start,
                    end,
                },
            ])
        }
    }

    return (
        <div className="h-screen p-4 bg-gray-50">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 2rem)' }}
                defaultView={Views.DAY}
                views={[Views.DAY]}
                selectable
                onSelectSlot={handleSelect}
                step={30}
                timeslots={2}
                components={{
                    toolbar: CustomToolbar,
                }}
                className="bg-white shadow-lg rounded-lg"
            />
        </div>
    )
}

export default MyCalendar