import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

export default function Reflect() {

    const [date, setDate] = React.useState(
        {
            month: "",
            year: ""
        }
    )
    const [backendData, setBackendData] = React.useState()
    const [retrievalMessage, setRetrievalMessage] = React.useState()


    function handleChange(event) {
        const {name, value} = event.target
        setDate(prevDate => ({
            ...prevDate,
            [name]: value
        }))
    }


    function handleSubmit(event) {
        event.preventDefault()

        const finalData = new FormData()
        finalData.append("month", date.month + " " + date.year)

        fetch("/get_data" ,{
            method: "POST",
            body: finalData,
            'Content-Type': 'mutlipart/form-data'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setBackendData(data)
            setRetrievalMessage(data[0].message)
        })
        
    }


    return (

        <div className="reflect--main">
            <Header />

            <h2 className="reflect--title">What month do you want to remember?</h2>

            <div className="reflection--inputs">

                <input 
                    type="text"
                    placeholder="Month"
                    className="reflect--text--input"
                    name="month"
                    value={date.month}
                    onChange={handleChange}
                />

                <input 
                    type="text"
                    placeholder="Year"
                    className="reflect--text--input"
                    name="year"
                    value={date.year}
                    onChange={handleChange}
                />

                <button className="submit--button" onClick={handleSubmit}>Submit</button>
            </div>
            
            <div className="entries--grid">
                {retrievalMessage == "Entry retrieval successful" &&
                    backendData.slice(1).map(item => {
                        return (
                            <Link className="entry--photo--link" key={item.key} to="/entry" state={item}>
                                <img 
                                className="entry--photo"
                                src={`data:image;base64,${item.image}`}
                                />
                                <h2 className="entry--date">{item.day}</h2>
                            </Link>
                        )
                    })
                }
            
            </div>

            {retrievalMessage == "Entry does not exist" && <h1 className="no--entries">There are no entries from this month</h1>}

        </div>
    )
}