import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "@material-ui/core";
import './spider.css';

const axios = require('axios').default;
require('dotenv').config(".env");

//backend base URL
const REACT_APP_BASE_BACKEND_URL = process.env["REACT_APP_BASE_BACKEND_URL"];

const SpiderChart = () => {
  
  // state variables
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState("");
  const [lables, setLables] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [pwd, setPwd] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); 

  // chart config
  let options = {
    chart: {
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
    },
    title: {
      text: title
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: lables
    }
  };

  //populate data to chart
  const setChardData = (dataset) => {
    let lables = (dataset.length === 0)?[]:dataset[0].lables;
    let title = (dataset.length === 0)?[]:dataset[0].title;

    setSeries(dataset)
    setTitle(title)
    setLables(lables)

  }

  //set file to state
  const onFileChange = async(event) => {
    setSelectedFile(event.target.files[0]);
  }

  //upload file to backend
  const onFileUpload = async() => {
    try{
      //check file selected
      if(selectedFile === null){
        alert("Please select an excel file");
        return;
      }
      // Create an object of formData
      const formData = new FormData();
          
      // Update the formData object
      formData.append(
        "dataFile",
        selectedFile,
        selectedFile.name
      );

      // Request made to the backend api
      // Send formData object
      axios.post("/saveData", formData).then(
        response => {
          //if handled error
          if(response.data.error){
            console.error(response.data.message);
            alert(response.data.message);
          }else{
            // success -> refresh data
            setSelectedFile(null);
            // setChardData(response.data.data);
            document.getElementById("file").value = "";
            let currentSession = response.data.data[0].sessionId;
            setSessionId(currentSession);
            if(pwd !== null){
              loadSessions();
            }
            
          }
        }
      ).catch(e => {
        //if un handled error from server
        console.error(e);
        alert(e.message);
      
      });

    }catch(e){
      //if un handled error from front
      console.error(e)
      alert(e.message);
    }
  }

  const loadSessions = async () => {
    let tempPwd = null;
    if(pwd === null){
      tempPwd = prompt("Please enter password");
    }else{
      tempPwd = pwd;
    }

    if(tempPwd !== null && tempPwd.trim() !== ""){

      //call backend for data
      axios.post("/getSessions", { pwd : tempPwd }).then(
        response => {
          //if handled error from server
          if(response.data.error){
            console.error(response.data.message);
            alert(response.data.message);
          }else{
            //if success set data for dropdown
            if(pwd === null){
              setPwd(tempPwd);
            }
            let sessions = response.data.data;
            setSessions(sessions);
          }
        }
      ).catch(e => {
        //if un handled error from server
        console.error(e);
        alert(e.message);
      
      });
    }

  }

  const selectSession = async (e) => {
    if(e.target.value === ""){
      setSessionId("");
      setSeries([]);
      setTitle("");
      setLables([]);
    }else{
      setSessionId(e.target.value);
    }
  }

  //select session
  useEffect(() => {
    //retrieve data from backend
    const getChartData = () => {
      if(sessionId.trim() === ""){
        console.error("Session not selected")
        return;
      }
      //call backend for data
      axios.post("/getData", {
        sessionId : sessionId,
        // pwd : pwd
      }).then(
        response => {
          //if handled error from server
          if(response.data.error){
            console.error(response.data.message);
            alert(response.data.message);
          }else{
            //if success set data for chart
            setChardData(response.data.data);
            
          }
        }
      ).catch(e => {
        //if un handled error from server
        console.error(e);
        alert(e.message);
      
      });
    };

    getChartData()
  }, [sessionId]);

  let sessionOpts = sessions.map( session => {
    return <option key={session._id} value={session._id}>{session.session+" - "+session.filename}</option>
  }) 

  sessionOpts = [<option key="_" value="">--SELECT--</option>].concat(sessionOpts)
  return (
    <>
      <div className="container-fluid px-0">
        <div className="navbar navbar-expand-sm bg-navbar p-4">
          <span
            className="navbar-brand text-light mx-auto font-weight-bold "
          >
            WristIndex
          </span>
        </div>
        <div className="row" id="chartDiv">
          <div className="col-md-9 col-sm-12">
            <ReactApexChart 
              options={options} 
              series={series} 
              type="radar"
              height={365}
            />
          </div>
          <div className="col-md-3 col-sm-12 bg-content">
            
          </div>
        </div>
        <div className="row bg-footer">
          <div className="container">
            <div className="col-md-12">
              <div className="form-inline">
                {/* SESSION FORM COMPONENT */}
                <div className="col-md-6">
                  <div className="row" >
                    <Button variant="contained" onClick={loadSessions} disabled={(sessions.length > 0?true:false)}> Load Sessions </Button>
                    <div className="space"></div>
                    <select className="form-control" value={sessionId} onChange={selectSession}>
                      {sessionOpts}
                    </select>
                    {/* {(sessionOpts.length > 1)?(
                      
                    ):(
                      ""
                    )} */}
                  </div>
                </div>

                {/* UPLOAD FORM COMPONENT */}
                <div className="col-md-6">
                  <div className="row" >
                    <input 
                      type="file"
                      id="file"
                      onChange={onFileChange}
                      className="form-control"
                      placeholder="Upload Excel File"
                    />
                    <div className="space"></div>
                    <Button variant="contained" onClick={onFileUpload}> Upload </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpiderChart;
