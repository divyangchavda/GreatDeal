import React, { useState } from 'react';
import Header from './Header';
import Panel from './Panel';
import Performm from './Performm';

function PerformPage({ setFilteredItems, filteredItems, setCartItems }) {
    const [showPanel, setShowPanel] = useState(false);
    const [search, setSearch] = useState('');
    const [currselectedCategory, setCurrSelectedCategory] = useState("");

    return (
        <div>
            <Header setShowPanel={setShowPanel} setSearch={setSearch} />
            <Panel setFilteredItems={setFilteredItems} showPanel={showPanel} setShowPanel={setShowPanel} search={search} setCurrSelectedCategory={setCurrSelectedCategory} />
            <Performm filteredItems={filteredItems} setCartItems={setCartItems} search={search} currselectedCategory={currselectedCategory} />
        </div>
    );
}

export default PerformPage;
