import {useState, FC, ChangeEvent} from 'react';

interface ElementInterface {
    code: string;
    name: string;
}

interface ComboBoxProps {
    ArrayElements: ElementInterface[];
    placeholder: string;
    onSelectedValueChange : (selectedValue: string) => void;
}

const ComboBox: FC<ComboBoxProps> = ({ArrayElements, placeholder, onSelectedValueChange }) => {
    const [searchTerm, setSearchTerm] = useState<ElementInterface>({code: '', name: ''});
    const [searchResults, setSearchResults] = useState<ElementInterface[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTermValue = event.target.value;
        setSearchTerm({...searchTerm, name: searchTermValue});

        // Filter the ArrayElements based on the search term
        const filteredResults = ArrayElements.filter(
            (ele) =>
                ele.name.toLowerCase().includes(searchTermValue.toLowerCase()) ||
                ele.code.toLowerCase().includes(searchTermValue.toLowerCase())
        );

        // Update the searchResults state with the filtered results
        setSearchResults(filteredResults);
    };

    return (
        <div className="relative flex-1">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        fill="#000000"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 371.656 371.656"
                    >
                        <g>
                            <g>
                                <g>
                                    <path d="M37.833,212.348c-0.01,0.006-0.021,0.01-0.032,0.017c-4.027,2.093-5.776,6.929-4.015,11.114
				c1.766,4.199,6.465,6.33,10.787,4.892l121.85-40.541l-22.784,37.207c-1.655,2.703-1.305,6.178,0.856,8.497
				c2.161,2.318,5.603,2.912,8.417,1.449l23.894-12.416c0.686-0.356,1.309-0.823,1.844-1.383l70.785-73.941l87.358-45.582
				c33.085-17.835,29.252-31.545,27.29-35.321c-1.521-2.928-4.922-6.854-12.479-8.93c-7.665-2.106-18.021-1.938-31.653,0.514
				c-4.551,0.818-7.063,0.749-9.723,0.676c-9.351-0.256-15.694,0.371-47.188,16.736L90.788,164.851l-66.8-34.668
				c-2.519-1.307-5.516-1.306-8.035,0.004l-11.256,5.85c-2.317,1.204-3.972,3.383-4.51,5.938c-0.538,2.556,0.098,5.218,1.732,7.253
				l46.364,57.749L37.833,212.348z"/>
                                    <path d="M355.052,282.501H28.948c-9.17,0-16.604,7.436-16.604,16.604s7.434,16.604,16.604,16.604h326.104
				c9.17,0,16.604-7.434,16.604-16.604C371.655,289.934,364.222,282.501,355.052,282.501z"/>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <input
                    type="text"
                    id="simple-search"
                    className="border rounded w-full px-4 py-2 pl-10 focus:outline-none focus:border-blue-400 focus:shadow-outline"
                    placeholder={placeholder}
                    required
                    onChange={handleChange}
                    value={searchTerm.name}
                />
            </div>
            {searchResults.length > 0 && (
                <ul className="absolute z-10 left-0 w-full bg-white rounded max-h-60 overflow-y-auto">
                    {searchResults.map((ele, index) => (
                        <li
                            className="px-4 py-2 hover:bg-gray-100"
                            key={index}
                            onClick={() => {
                                setSearchTerm(ele);
                                setSearchResults([]);
                                onSelectedValueChange(ele.code);
                            }}
                        >
                            {ele.name} ({ele.code})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComboBox;
