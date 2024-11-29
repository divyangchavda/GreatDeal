import React from 'react';
import Header from './Header';
import Panel from './Panel';
import Perform from './perform';


const PerformPage = ({ setFilteredItems, filteredItems }) => {
    return (
        <div>
            <Header />
            <Panel setFilteredItems={setFilteredItems} />
            <Perform filteredItems={filteredItems} />
            
        </div>
    );
};

export default PerformPage;
