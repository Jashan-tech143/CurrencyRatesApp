import React, { useEffect, useState } from "react";
import "mvp.css"; // Import MVP.css for styling

//searching from user input
const SearchBar = ({ onSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search currency..."
            onChange={(e) => onSearch(e.target.value)}
        />
    );
};

//display list of currency rates
const CurrencyList = ({ currencyData, searchQuery }) => {
    const filteredRates = Object.entries(currencyData.rates).filter(
        ([currency]) => currency.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ul>
            {filteredRates.map(([currency, rate]) => (
                <li key={currency}>
                    {currency}: {rate}
                </li>
            ))}
        </ul>
    );
};

const CurrencyRates = () => {
    const [currencyData, setCurrencyData] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const API_KEY = "6504fea6120c48b4874b021853d839f3";
    const API_URL = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`;

    //fetching data from API link
    useEffect(() => {
        const fetchCurrencyRates = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch currency data");

                const data = await response.json();
                setCurrencyData(data);
            } catch (err) {
                setError(err);
            }
        };
        fetchCurrencyRates();
    }, []);

    //If error display given messages
    if (error) return <div>Error fetching currency data: {error.message}</div>;
    if (!currencyData) return <div>Loading...</div>;

    //return the following
    return (
        <div>
            <h2>Currency Rates (Base Currency: {currencyData.base})</h2>
            <p>Date: {new Date(currencyData.date).toLocaleDateString()}</p>
            <SearchBar onSearch={setSearchQuery} />
            <CurrencyList currencyData={currencyData} searchQuery={searchQuery} />
        </div>
    );
};

//export all by default after page load
export default CurrencyRates;
