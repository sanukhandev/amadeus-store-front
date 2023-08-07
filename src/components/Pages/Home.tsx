import ComboBox from "../Shared/ComboBox.tsx";
import Airports from "../../assets/data/airports.json";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FlightDetails from "../Shared/FlightDetail.tsx";

const Home = () => {
    const [originAirport, setOriginAirport] = useState("");
    const [destinationAirport, setDestinationAirport] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [resultsAE, setResultsAE] = useState([]);
    const [resultsUS, setResultsUS] = useState([]);

    const fetchResults = async (currencyCode) => {
        const requestBody = {
            currencyCode,
            originDestinations: [{
                id: "1",
                originLocationCode: originAirport,
                destinationLocationCode: destinationAirport,
                departureDateTimeRange: { date: departureDate, time: "10:00:00" }
            }],
            travelers: [{ id: "1", travelerType: "ADULT" }],
            sources: ["GDS"],
            searchCriteria: {
                maxFlightOffers: 5,
                flightFilters: {
                    cabinRestrictions: [{ cabin: "ECONOMY", coverage: "MOST_SEGMENTS", originDestinationIds: ["1"] }]
                }
            }
        };

       return await fetch('http://localhost:5001/flight-offers/EU', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
    };

    const onSubmit = async () => {
        const resultSet = await Promise.all([
            fetchResults("AED"),
            fetchResults("USD"),
        ]);
        setResultsUS(resultSet[1].data);
        setResultsAE(resultSet[0].data);

    };

    return (
        <div className="flex flex-col pt-5">
            <div className="flex items-center space-x-4">
                <ComboBox placeholder="Origin Airport" ArrayElements={Airports} onSelectedValueChange={setOriginAirport} />
                <ComboBox placeholder="Destination Airport" ArrayElements={Airports} onSelectedValueChange={setDestinationAirport} />
                <input type="date" className="border rounded w-full px-4 py-2" placeholder="Departure Date" onChange={({ target: { value } }) => setDepartureDate(value)} value={departureDate} />
                <input type="date" className="border rounded w-full px-4 py-2" placeholder="Return Date" onChange={({ target: { value } }) => setReturnDate(value)} value={returnDate} />
                <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={onSubmit}>
                    Search
                </button>
            </div>
            <Tabs>
                <TabList>
                    <Tab>AE</Tab>
                    <Tab>US</Tab>
                </TabList>
                <TabPanel>
                    {resultsAE.map(result => <FlightDetails data={result}/>)}
                </TabPanel>
                <TabPanel>
                    {resultsUS.map(result => <FlightDetails data={result}/>)}
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Home;
