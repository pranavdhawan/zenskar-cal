import { EventType } from "../types";

export type PositionedEvent = EventType & {
    left: number;
    width: number;
}

export function arrangeEvents(events: EventType[]): PositionedEvent[] {

    const sortedEvents = events.sort((a, b) => a.start - b.start)
    let positionedEvents: PositionedEvent[] = []
    let columns: EventType[][] = []

    sortedEvents.forEach(event => {
        let placed = false

        for (let column of columns) {
            if (column[column.length - 1].end <= event.start) {
                column.push(event)
                placed = true
                break
            }
        }

        if (!placed) {
            columns.push([event])
        }

    })

    const columnCount = columns.length
    const columnWidth = 600 / columnCount

    columns.forEach((column, colIndex) => {
        column.forEach(event => {
            positionedEvents.push({
                ...event,
                left: colIndex * columnWidth,
                width: columnWidth
            })
        })
    })

    return positionedEvents
}