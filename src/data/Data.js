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

    const getRound = (round)=>{
        let searonRound = []
        if(plData){
            plData.forEach(fixture=>{
                if(fixture.league.round == round){
                    searonRound.push(fixture)
                }
            })
            return searonRound
        }
    }   
    const TableSchema = (props)=>{
        return  <Table striped hover size="sm" variant="dark">
            <h5 style={{textAlign:"center"}}> {props.name}</h5>
        <thead>
            <tr className="match">
                <th> Date</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Venue</th>
            </tr>
        </thead>
        <tbody>
    {props.arr? props.arr.map((item,i)=>(              
        <tr id={i} key={i} className="match">
            <td className="match_date">{item.fixture.date}</td>
                <td className="match_team team_home">  {item.teams.home.name} <img src={item.teams.home.logo}/> </td>
                <td className="match_score">{item.score.fulltime.home}</td>
                <td className="match_score">{item.score.fulltime.away}</td>
                <td className="match_team team_away"><img src={item.teams.away.logo}/> {item.teams.away.name} </td>
                <td className="match_date">{item.fixture.venue.name}</td>
            </tr>
        )):null}
        </tbody>
    </Table> 
    }
    
    
    
    return(
        <div className="match_wrapper container-fluid">
            {plData? plData.map((fixture,i)=>(i<38?
                <div><TableSchema name= {`Regular Season - Round ${i+1}`} arr={getRound(`Regular Season - ${i+1}`)}/></div>
            :null)):null}

        </div>
    )
}
export default Data
