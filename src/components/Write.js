import React from "react";

import Header from "./Header";

export default function Write() {

    const [inputImage, setInputImage] = React.useState()
    const [inputText, setInputText] = React.useState("")

    const [backendData, setBackendData] = React.useState()
    const [backendImage, setBackendImage] = React.useState()



    function handleSubmit(event) {
        event.preventDefault()
        
        const date = new Date()

        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

        const month = [monthNames[date.getMonth()], date.getFullYear()].join(" ")
        const day = date.getDate()

        const finalData = new FormData()
        finalData.append("month", month)
        finalData.append("day", day)
        finalData.append("entry", inputText)
        finalData.append("file", inputImage)
        
        fetch("/send_data" ,{
            method: "POST",
            body: finalData,
            'Content-Type': 'mutlipart/form-data'
        })
        .then(res => res.json())
        .then(data => {
            setBackendData(data)
        })
    }



    return (
        <div className="write--main">
            
            <Header />

            <div className="write--option">
                <h2 className="write--prompt">How was your day?</h2>
                <textarea 
                    className="write--message"  
                    placeholder="Write about it"
                    rows="5"
                    cols="33"
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                />
            </div>

            <div className="write--photo--input">
                <label className="write--upload--photo">
                    {inputImage === undefined ? <p>Upload<br /><span>Images</span></p>: inputImage.name} 
                    
                    {/* <span>Image</span> */}
                    <input 
                        type="file"
                        name="images"
                        accept="image/png"
                        className="Write--image--input"
                        onChange={(event) => setInputImage(event.target.files[0])}
                    />
                </label>

                <h2 className="quote">How will you remember today?</h2>
            
            </div>
            
            <button className="submit--button" onClick={handleSubmit}>Submit</button>

        </div>

    )
}