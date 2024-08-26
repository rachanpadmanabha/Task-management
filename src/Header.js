import React from 'react';

function Header({ title, onBack }) {
    return (
        <div className="flex gap-4 items-center bg-[#034EA2] text-white p-4 rounded-lg">
            {title.includes("Task") && <button onClick={onBack} className="text-xl">&#8592;</button>}
            <h1 className="text-lg font-semibold ">{title}</h1>
            <div style={{ width: "24px" }} /> {/* Placeholder to balance the layout */}
        </div>
    );
}

export default Header;
