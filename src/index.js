import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
} from "react-router-dom"

import App from './App';
import Home from './components/Home';
import Write from './components/Write';
import Reflect from './components/Reflect';
import "./styles.css"


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<RouterProvider router={router}/>);
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)

