import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ title }) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4 items-center bg-[#034EA2] text-white p-4 rounded-lg">
            {title !== "TO-DO APP" && (
                <button onClick={() => navigate(-1)} className="text-xl">&#8592;</button>
            )}
            <h1 className="text-lg font-semibold">{title}</h1>
            <div style={{ width: "24px" }} /> {/* Placeholder to balance the layout */}
        </div>
    );
}

export default Header;
