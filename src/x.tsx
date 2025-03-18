export default function Home() {

    const events = [
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



    const timeSlots = Array.from({ length: 13 }, (_, i) => i + 9) // 8 AM to 4 PM

    // Helper function to calculate event position and height
    const calculateEventStyle = (start: number, end: number) => {
        const startHours = start / 60  // Convert minutes to hours from 9 AM
        const endHours = end / 60
        const top = startHours * 80    // 80px per hour
        const height = (endHours - startHours) * 80
        return { top: `${top}px`, height: `${height}px` }
    }




    const eventColors = [
        'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
        'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500'
    ];

    const layoutEvents = (events: Array<{ start: number; end: number; title: string }>) => {
        const sortedEvents = [...events].sort((a, b) => a.start - b.start);
        const columns: Array<Array<{ start: number; end: number; title: string }>> = [];
        const eventLayouts = new Map();

        sortedEvents.forEach(event => {
            // Find all existing events that overlap with current event
            const overlappingEvents = columns.flat().filter(e =>
                e !== event && event.start < e.end && event.end > e.start
            );

            // Find first available column considering all overlapping events
            let targetColumn = 0;
            let maxOverlappingColumns = 0;

            // Count maximum overlapping events at any point
            overlappingEvents.forEach(e => {
                const layout = eventLayouts.get(e);
                maxOverlappingColumns = Math.max(maxOverlappingColumns, layout?.column + 1 || 0);
            });

            // Find first available column
            while (columns[targetColumn] &&
                columns[targetColumn].some(e =>
                    event.start < e.end && event.end > e.start)) {
                targetColumn++;
            }

            // Create column if it doesn't exist
            if (!columns[targetColumn]) {
                columns[targetColumn] = [];
            }

            // Add event to column
            columns[targetColumn].push(event);

            // Calculate total columns needed
            const totalColumns = Math.max(3, maxOverlappingColumns + 1, targetColumn + 1);

            // Update layout for current event
            eventLayouts.set(event, {
                column: targetColumn,
                totalColumns: totalColumns
            });

            // Update all overlapping events
            overlappingEvents.forEach(e => {
                const currentLayout = eventLayouts.get(e);
                eventLayouts.set(e, {
                    ...currentLayout,
                    totalColumns: totalColumns
                });
            });
        });

        return eventLayouts;
    };

    const eventLayouts = layoutEvents(events)

    console.log(eventLayouts)

    return (
        <div className="flex justify-center items-center ">
            <div className="w-[620px] h-[720px] flex flex-col my-8">


                <header className="flex items-center justify-between px-4 py-3 border-b border-white/20">
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-semibold text-black drop-shadow-lg">Zenskar Calendar</span>
                    </div>
                </header>

                <main className="flex-1 p-[10px]">
                    <div className="h-full bg-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600 shadow-2xl">
                        <div className="h-full grid grid-cols-8">

                            <div className="text-white/70">
                                {timeSlots.map((time, i) => (
                                    <div key={i} className="h-20 border-b border-white/10 pr-2 text-right text-xs">
                                        {time > 12 ? `${time - 12} PM` : `${time} AM`}
                                    </div>
                                ))}
                            </div>

                            {/* cols */}
                            <div className="col-span-7 border-l border-white/20 relative">
                                {timeSlots.map((_, timeIndex) => (
                                    <div key={timeIndex} className="h-20 border-b border-white/10"></div>
                                ))}

                                {events.map((event, i) => {

                                    const eventStyle = calculateEventStyle(event.start, event.end)
                                    const randomColor = eventColors[Math.floor(Math.random() * eventColors.length)]
                                    const layout = eventLayouts.get(event)
                                    return (
                                        <div
                                            key={i}
                                            className={`absolute ${randomColor} rounded-md p-2 text-white text-xs shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-lg`}
                                            style={{
                                                ...eventStyle,
                                                left: `${(layout.column * (100 / layout.totalColumns))}%`,
                                                width: `${100 / layout.totalColumns}%`,
                                                right: 'auto',
                                            }}
                                        >
                                            <div className="font-medium">{event.title}</div>
                                            <div className="opacity-80 text-[10px] mt-1">
                                                {`${Math.floor(event.start / 60) + 9}:${String(event.start % 60).padStart(2, '0')} - ${Math.floor(event.end / 60) + 9}:${String(event.end % 60).padStart(2, '0')}`}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {/* </div>
                    </div>
                </div> */}
                    </div>
                </main>
            </div>

        </div>
    )
}

