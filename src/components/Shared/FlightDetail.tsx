const FlightDetails = ({ data }) => {
    const { itineraries, price } = data;
    const itinerary = itineraries[0];
    const segments = itinerary.segments;

    const formatTime = (dateTime: string) => {
        const [date, time] = dateTime.split('T');
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };
    const formatDuration = (duration: string) => {
        duration = duration.replace('PT', '');
        duration = duration.replace('H', 'h ');
        duration = duration.replace('M', 'm');
        return duration;
    };

    const numberOfStops = segments.length - 1;

    return (
        <div className="p-4 border rounded-lg bg-white shadow-md">
            {segments.map((segment, index) => (
                <div key={index} className="flex flex-row justify-between mb-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Departure</span>
                        <span className="text-lg font-bold">{formatTime(segment.departure.at)}</span>
                        <span className="text-sm text-gray-500">{segment.departure.iataCode}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Arrival</span>
                        <span className="text-lg font-bold">{formatTime(segment.arrival.at)}</span>
                        <span className="text-sm text-gray-500">{segment.arrival.iataCode}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Duration</span>
                        <span className="text-lg font-bold">{formatDuration(segment.duration)}</span>
                    </div>
                </div>
            ))}
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Origin</span>
                    <span className="text-lg font-bold">{segments[0].departure.iataCode}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Destination</span>
                    <span className="text-lg font-bold">{segments[segments.length - 1].arrival.iataCode}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Stops</span>
                    <span className="text-lg font-bold">{numberOfStops > 0 ? `${numberOfStops} stops` : "Non-stop"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="text-lg font-bold">{price.total} {price.currency}</span>
                </div>
            </div>
        </div>
    );
};

export default FlightDetails;
