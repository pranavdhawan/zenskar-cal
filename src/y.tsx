import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const CustomToolbar = ({ label }: { label: string }) => (
    <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="text-xl font-semibold">{label}</div>
    </div>
)

const SecondCal = () => {

    const rawEvents = [
        { title: "Sample item 1", start: 10, end: 90 },
        { title: "Sample item 2", start: 20, end: 80 },
        { title: "Sample item 3", start: 70, end: 180 },
        { title: "Sample item 4", start: 90, end: 180 },
        { title: "Sample item 5", start: 200, end: 270 },
        { title: "Sample item 6", start: 230, end: 290 },
        { title: "Sample item 7", start: 300, end: 340 },
        { title: "Sample item 8", start: 350, end: 400 },
        { title: "Sample item 9", start: 370, end: 580 },
        { title: "Sample item 10", start: 410, end: 480 },
        { title: "Sample item 11", start: 450, end: 590 },
        { title: "Sample item 12", start: 500, end: 595 },
        { title: "Sample item 13", start: 530, end: 590 },
        { title: "Sample item 14", start: 600, end: 660 },
        { title: "Sample item 15", start: 650, end: 690 },
        { title: "Sample item 16", start: 670, end: 710 }
    ];

    const events = rawEvents.map((event, index) => ({
        id: index + 1,
        title: event.title,
        start: moment().hour(9).minute(event.start).second(0).toDate(),
        end: moment().hour(9).minute(event.end).second(0).toDate()
    }))

    return (

        // The events must be displayed within a 620px wide
        //  container(600px for content and 10px of padding on the left and right)
        // and 720px tall, representing a 9 AM to 9 PM schedule.
        <div className='flex justify-center items-center min-h-screen bg-gray-50'>
            <div className="w-[620px] h-[720px] p-[10px]">
                <Calendar
                    localizer={localizer}
                    dayLayoutAlgorithm='no-overlap'
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    defaultView={Views.DAY}
                    step={30}
                    min={moment().hour(9).minute(0).toDate()}
                    max={moment().hour(22).minute(0).toDate()}
                    // timeslots={2}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                    className="bg-white shadow-lg rounded-lg"
                />
            </div>
        </div>
    )
}

export default SecondCal