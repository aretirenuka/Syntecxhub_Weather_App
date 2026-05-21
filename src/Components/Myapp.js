import React, { useState } from 'react'
import cloud from "../images/Clouds.png"
import rain from "../images/Rain.png"
import clear from "../images/Clear.png"
import mist from "../images/mist.png"
import err from "../images/error.png"




const Myapp = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState()
    const [error, setError] = useState()

    const API_KEY ="6d83156e4e40ca97d0c6924b832fe00c"

    const handleInput = (event) =>{
        setSearch(event.target.value)
        console.log(event.target.value);
    }
 
    const myFun = async () =>{
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
        
        const jsonData = await get.json()
        console.log(jsonData);
        setData(jsonData);

        if(search === ""){
            // alert("Enter name")
            setError("Please Enter Name")
        }
        else if(jsonData.cod === '404'){
            setError("Please Enter Valid Name !")
        }else{
            setError("")
        }
        setSearch("")
    }
    
  return (
     <>
        <div className='container'>
            <div className='inputs'>
                <input placeholder='Enter city, Country' value={search} onChange={handleInput} />
                <button onClick={myFun}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div>
            {
                error ?
                <div className='errorPage'>
                    <p>{error}</p>
                    <img src={err} alt="Error" />
                </div> : ""
            }
            {
                data && data.weather ?
                <div className='weathers'>
                    <h2 className='cityName'>{data.name}</h2>
                    {data.weather[0].main === "Clouds" && <img src={cloud} alt="Cloudy" />}
                    {data.weather[0].main === "Rain" && <img src={rain} alt="Rain" />}
                    {data.weather[0].main === "Clear" && <img src={clear} alt="Clear sky" />}
                    {data.weather[0].main === "Mist" && <img src={mist} alt="Mist" />}
                    {data.weather[0].main === "Haze" && <img src={cloud} alt="Haze" />}
                </div> : ""
            }

            </div>
        </div>
     </>
  )
}

export default Myapp