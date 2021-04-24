import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "@material-ui/core";

const initData = {
  series: [],
  options: {
    chart: {
      height: 600,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 3,
    },
    fill: {
      opacity: 0.2,
    },
    scale: {
      ticks: 10,
    },
    markers: {
      size: 6,
      colors: "red",
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
      hover: {
        sizeOffset: 3,
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "14 px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      categories: [],
    },
  },
};

const SpiderChart = () => {
  // const initCat = [];
  // const initValue = [];
  // const initShortName = [];
  const [catName, setCatName] = useState([]);
  const [catValue, setCatValue] = useState([]);
  const [shortName, setShortName] = useState([]);
  const [data, setData] = useState(initData);
  const [inputCat, setInputCat] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [newChartName, setNewChartName] = useState("");
  const [series, setSeries] = useState(initData.series);

  const addNewChart = () => {
    const tempSeries = {
      name: "Part " + (data.series.length + 1),
      data: catValue
    }
    initData.series.push(tempSeries);
    // setSeries(initData.series);
    setSeries((prevState) => {
      return [...prevState, prevState.push(tempSeries)]
    })
    setData(initData);
    console.log(data.series);
    // setData((prevState) => {
    //   // initData.series = series;
    //   console.log("series length11", initData);
    //   return initData;
    // });
    setCatValue([]);
    setNewChartName("");
    setShortName([]);
    setCatName([]);
  };

  const addCatalog = () => {
    if (inputCat === "" || inputValue === 0) {
      alert("Please input catalog data");
    } else {
      // console.log("series length", initData.series.length);
      // initData.series[initData.series.length - 1] = {
      //   name: "Part " + initData.series.length,
      //   data: catValue,
      // };
      initData.options.xaxis.categories = shortName;
      // console.log(
      //   "+++++",
      //   initData.series.length,
      //   initData.series[initData.series.length]
      // );
      setInputCat("");
      setInputValue("");
      setData(initData);
    }
    console.log(catValue);
  };

  const setInitData = () => {
    setCatName((prevState) => {
      return [...prevState, inputCat];
    });
    setCatValue((prevState) => {
      return [...prevState, inputValue];
    });
    setShortName((prevState) => {
      return [...prevState, "Cat" + catName.length];
    });
  };

  // console.log(data);

  const setInitSeries = () => {
    setCatValue([]);
    setShortName([]);
    setCatName([]);
  };

  const inputCatalog = (e) => {
    setInputCat(e.target.value);
  };

  const inputCatValue = (e) => {
    setInputValue(e.target.value);
  };

  const inputNewChartName = (e) => {
    setNewChartName(e.target.value);
  };

  return (
    <>
      <div className="container-fluid px-0">
        <div className="navbar navbar-expand-sm bg-navbar p-4">
          <a
            className="navbar-brand text-light mx-auto font-weight-bold "
            href="#"
          >
            WristIndex
          </a>
        </div>
        <div className="row">
          <div className="col-md-9 col-sm-12">
            <div id="chart mt-5">
              <ReactApexChart
                options={data.options}
                series={series}
                type="radar"
                height={600}
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-12 bg-content">
            <div className="mt-4">
              {catName &&
                catName.map((item, key) => {
                  return (
                    <p key={key} className="px-3">
                      Cat{key + 1}: {item}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="row bg-footer">
          <div className="container">
            <div className="col-md-12">
              <div className="form-inline">
                <input
                  type="text"
                  className="form-control"
                  value={inputCat}
                  placeholder="Catalog Name"
                  onChange={(e) => inputCatalog(e)}
                ></input>
                <input
                  type="number"
                  className="form-control"
                  value={inputValue}
                  placeholder="Value"
                  onChange={(e) => inputCatValue(e)}
                  onBlur={() => setInitData()}
                ></input>
                <Button variant="contained" onClick={addCatalog}>
                  Add Catalog
                </Button>
              </div>
              <div className="form-inline">
                <input
                  type="text"
                  className="form-control"
                  value={newChartName}
                  placeholder="New Chart Name"
                  // onBlur={() => setInitSeries()}
                  onChange={(e) => inputNewChartName(e)}
                ></input>
                <Button variant="contained" onClick={() => addNewChart()}>
                  Add New Chart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpiderChart;
