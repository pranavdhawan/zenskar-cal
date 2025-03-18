import React from 'react'

const view = () => {


    const [selectedEvent, setSelectedEvent] = useState(null)

    return (
        <>
            {/* Week View */}
            <div className="flex-1 overflow-auto p-4">
                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl h-full">
                    {/* Week Header */}
                    <div className="grid grid-cols-8 border-b border-white/20">
                        <div className="p-2 text-center text-white/50 text-xs"></div>
                        {weekDays.map((day, i) => (
                            <div key={i} className="p-2 text-center border-l border-white/20">
                                <div className="text-xs text-white/70 font-medium">{day}</div>
                                <div
                                    className={`text-lg font-medium mt-1 text-white ${weekDates[i] === 5 ? "bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}`}
                                >
                                    {weekDates[i]}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Time Grid */}
                    <div className="grid grid-cols-8">
                        {/* Time Labels */}
                        <div className="text-white/70">
                            {timeSlots.map((time, i) => (
                                <div key={i} className="h-20 border-b border-white/10 pr-2 text-right text-xs">
                                    {time > 12 ? `${time - 12} PM` : `${time} AM`}
                                </div>
                            ))}
                        </div>

                        {/* Days Columns */}
                        {Array.from({ length: 7 }).map((_, dayIndex) => (
                            <div key={dayIndex} className="border-l border-white/20 relative">
                                {timeSlots.map((_, timeIndex) => (
                                    <div key={timeIndex} className="h-20 border-b border-white/10"></div>
                                ))}

                                {/* Events */}
                                {events
                                    .filter((event) => event.day === dayIndex + 1)
                                    .map((event, i) => {
                                        const eventStyle = calculateEventStyle(event.startTime, event.endTime)
                                        return (
                                            <div
                                                key={i}
                                                className={`absolute ${event.color} rounded-md p-2 text-white text-xs shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-lg`}
                                                style={{
                                                    ...eventStyle,
                                                    left: "4px",
                                                    right: "4px",
                                                }}
                                                onClick={() => handleEventClick(event)}
                                            >
                                                <div className="font-medium">{event.title}</div>
                                                <div className="opacity-80 text-[10px] mt-1">{`${event.startTime} - ${event.endTime}`}</div>
                                            </div>
                                        )
                                    })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${selectedEvent.color} p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}>
                        <h3 className="text-2xl font-bold mb-4 text-white">{selectedEvent.title}</h3>
                        <div className="space-y-3 text-white">
                            <p className="flex items-center">
                                <Clock className="mr-2 h-5 w-5" />
                                {`${selectedEvent.startTime} - ${selectedEvent.endTime}`}
                            </p>
                            <p className="flex items-center">
                                <MapPin className="mr-2 h-5 w-5" />
                                {selectedEvent.location}
                            </p>
                            <p className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                {`${weekDays[selectedEvent.day - 1]}, ${weekDates[selectedEvent.day - 1]} ${currentMonth}`}
                            </p>
                            <p className="flex items-start">
                                <Users className="mr-2 h-5 w-5 mt-1" />
                                <span>
                                    <strong>Attendees:</strong>
                                    <br />
                                    {selectedEvent.attendees.join(", ") || "No attendees"}
                                </span>
                            </p>
                            <p>
                                <strong>Organizer:</strong> {selectedEvent.organizer}
                            </p>
                            <p>
                                <strong>Description:</strong> {selectedEvent.description}
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                                onClick={() => setSelectedEvent(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default view