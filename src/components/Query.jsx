'use client';

import { useState } from 'react';

export default function Query() {
    const [searchType, setSearchType] = useState('name');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setQuery(''); // Clear query when search type changes
    };

    const handleQueryChange = (e) => setQuery(e.target.value);

    const fetchDinosaurs = async () => {
        const encodedQuery = encodeURIComponent(query);
        try {
            const res = await fetch(`/api/dinosaurs/${searchType}/${encodedQuery}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setResults(data);
            setQuery('');
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

    const getPlaceholderExample = () => {
        switch (searchType) {
            case 'name':
                return 'e.g. Tyrannosaurus';
            case 'diet':
                return 'e.g. carnivorous';
            case 'region':
                return 'e.g. Colorado';
            case 'class':
                return 'e.g. Saurischia';
            case 'family':
                return 'e.g. Tyrannosauridae';
            case 'type':
                return 'e.g. theropod';
            default:
                return '';
        }
    };

    return (
        <>
            <div className="min-h-screen h-full w-full flex flex-col justify-start items-center bg-emerald-800 text-white">
                <div className='text-center justify-center flex flex-col bg-white text-emerald-800 w-full py-4'>
                    <p className="font-bold text-3xl">Dinosaur Fossil Occurrence Database</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 mt-8">
                    <select
                        className="p-2 w-80 text-black bg-gray-200 rounded-md"
                        value={searchType}
                        onChange={handleSearchTypeChange}
                    >
                        <option value="name">Name</option>
                        <option value="diet">Diet</option>
                        <option value="region">Region</option>
                        <option value="class">Class</option>
                        <option value="family">Family</option>
                        <option value="type">Type</option>
                    </select>
                    <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-2">
                        <input
                            className="p-2 text-black w-80 bg-gray-200 rounded-md"
                            type="text"
                            placeholder={`Enter ${searchType.charAt(0).toUpperCase() + searchType.slice(1)} (e.g. ${getPlaceholderExample()})`}
                            value={query}
                            onChange={handleQueryChange}
                        />
                        <button
                            className="bg-blue-500 duration-300 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4 sm:mt-0 w-full sm:w-auto"
                            onClick={fetchDinosaurs}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {results && (
                    <div className='px-2 my-auto justify-center  flex flex-col'>
                        <div className="w-full my-8 sm:mb-0 sm:mt-0 lg:mt-0 max-w-lg sm:max-w-2xl lg:max-w-6xl lg:w-full rounded-md bg-white p-4 shadow-lg">
                            <h2 className="text-xl font-bold mb-4 text-emerald-800 text-center">Results ({results.length})</h2>
                            <div className="overflow-auto max-h-80 lg:grid lg:grid-cols-3 sm:grid-cols-2 sm:grid sm:gap-4">
                                {results.map((dinosaur, index) => (
                                    <div key={index} className="mb-4 p-4 bg-emerald-800 rounded-md">
                                        <h3 className="text-lg font-semibold">{index + 1}. {dinosaur.name}</h3>
                                        <p><strong>Diet:</strong> {dinosaur.diet}</p>
                                        <p><strong>Type:</strong> {dinosaur.type}</p>
                                        <p><strong>Length:</strong> {dinosaur.length_m} meters</p>
                                        <p><strong>Period:</strong> {dinosaur.min_ma} - {dinosaur.max_ma} million years ago</p>
                                        <p><strong>Region:</strong> {dinosaur.region}</p>
                                        <p><strong>Location:</strong> {dinosaur.lat} lat, {dinosaur.lng} lon</p>
                                        <p><strong>Class:</strong> {dinosaur.class}</p>
                                        <p><strong>Family:</strong> {dinosaur.family}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <footer className='bg-white text-emerald-800 font-semibold py-2'>
                <p className="text-center">Powered by <a href="https://www.hookerhillstudios.com" className="text-blue-500 hover:text-emerald-800 duration-300">Hooker Hill Studios</a></p>
            </footer>
        </>
    );
}
