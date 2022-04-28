import React, {useState,useEffect} from "react";
import './style.css'
import { Table } from "react-bootstrap";
const Data = ()=>{
    const [plData,setPlData] = useState(null)
    const [roundsData,setRoundsData] = useState(null)
    const [dataWithRounds,setDataWithRounds] = useState(null)


    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'X-RapidAPI-Key': 'a0bde3d87amsh3ceba186147e178p1b576djsn43ac8d69d928'
            }
        };
        
        fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=39&season=2020', options)
            .then(response => response.json())
            .then(response =>{
                console.log(response)
                setRoundsData(response.response)
                })
            .catch(err => console.error(err));

    },[])
    
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
        let firstR = []
        let secondR = []
        let smth = []
        useEffect(()=>{
            const dataBase = {   
            }
            let roundName
            if(roundsData){
                roundsData.forEach(round=>{
                    roundName=round
                    smth=[]
                    if(plData){
                        plData.forEach(fixture=>{
                            if(roundName == fixture.league.round){
                                smth.push(fixture)
                            }
                    })
                dataBase[roundName]=[smth]
                }
            })           
             
            setDataWithRounds(dataBase)
            }
        },[])


        const firstRound = ()=> {
            if(plData){
                plData.forEach(element => {               
                    if(element.league.round=="Regular Season - 1"){
                        firstR.push(element)
                    }else if(element.league.round=="Regular Season - 2"){
                        secondR.push(element)
                    }
                }
                )
            }
        }


        firstRound()


        const TableSchema = (props)=>{
            return  <Table striped hover size="sm" variant="dark">
                
            <thead>
                <tr className="match">
                    <th> Date</th>
                    <th></th>
                    <th>{props.name}</th>
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
            {dataWithRounds? <div> asd asd</div>:null}
           
        </div>
    )
}
export default Data