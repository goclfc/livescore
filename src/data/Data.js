import React, {useState,useEffect} from "react";
import './style.css'
import { Table } from "react-bootstrap";
const Data = ()=>{
    const [plData,setPlData] = useState(null)
    
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'X-RapidAPI-Key': 'a0bde3d87amsh3ceba186147e178p1b576djsn43ac8d69d928'
            }
        };
        fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2020', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPlData(response.response)})
            .catch(err => console.error(err));
    },[])

    return(
        <div className="match_wrapper container-fluid">
            <Table striped hover size="sm" variant="dark">
                <thead>

                </thead>
                <tbody>
            {plData? plData.map((item,i)=>(              
                    <tr id={i} key={i} className="match">
                        
                        <td className="match_team team_home">  {item.teams.home.name} <img src={item.teams.home.logo}/> </td>
                        <td className="match_score">{item.score.fulltime.home}</td>
                        <td className="match_score">{item.score.fulltime.away}</td>
                        <td className="match_team team_away"><img src={item.teams.away.logo}/> {item.teams.away.name} </td>
                    </tr>
                )):null}
                </tbody>
            </Table> 


        </div>
    )
}
export default Data