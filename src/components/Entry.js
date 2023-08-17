import React from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";

export default function Entry() {

    const location = useLocation();
    const propsData = location.state;

    return (
        <div>
            <Header />
            <div className="main--entry">
                <h2>{propsData.month.split(" ")[0]}, {propsData.day}</h2>
                <p>{propsData.entry}</p>
                <img 
                    src={`data:image;base64,${propsData.image}`}
                    width="400px"
                    height="400px"
                />
            </div>
        </div>
    )
    
}