import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Write from "./components/Write";
import Reflect from "./components/Reflect";
import Home from "./components/Home";
import Entry from "./components/Entry";


export default function App() {
    return (
        <div>
            <Routes>
                {/* <Route path="/entry" element={<Entry />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<Write />} />
                <Route path="/reflect" element={<Reflect />} />
                <Route path="/entry" element={<Entry />} />
            </Routes>
        </div>
    )
}