import React, { useState, useEffect } from "react";
import DicePlot from "../components/dicePlot.jsx";
import { findScenario, RANGES } from "../data/scenarios.js";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

/* ADD IMPORTS FROM TODO ON THE NEXT LINE */
/**
 * The About function defines the component that makes up the About page
 * This component is attached to the /about path in router.jsx
 */

const TEST = {
  scenario: {
    attackWarbands: 3,
    attackDieModifier: 0,
    defenseDice: 1,
    defenseWarbands: 1,
    numSims: 10000
  },
  remaining: [0, 1, 2, 3],
  remainingWinProb: [0.18603215999999997, 0.47781664, 0.30359556, 0.01267968],
  remainingLoseProb: [0, 0.01987596, 0, 0],
  winProbability: 0.9801240399999999,
  winPercents: [
    98.01240399999999,
    79.40918799999999,
    31.627523999999983,
    1.2679679999999889
  ],
  expectedBands: 1.1429227599999998
};

const MySlider = props => {
  return (
    <div className="slider-container">
      <div className="slider-label">{props.children}</div>
      <Slider
        min={props.range.min}
        max={props.range.max}
        onChange={v => props.setter(v)}
        value={props.value}
      />
      <div className="slider-value">{props.value}</div>
    </div>
  );
};

export default function Simulate() {
  const [dd, setDD] = useState(1);
  const [aw, setAW] = useState(3);
  const [dw, setDW] = useState(1);
  const [adm, setADM] = useState(0);
  const [data, setData] = useState(TEST);

  useEffect(async () => setData(await findScenario(adm, aw, dd, dw)));
  
  return (
    <div className="simulate-page">
      <h1 className="title">Oath Campaign Simulator</h1>
      <div className="simulate-content">
        <div className="simulate-container flex-container">
          <div className="controls-container">
            <MySlider range={RANGES.aw} setter={setAW} value={aw}>
              Attacking Warbands
            </MySlider>
            <MySlider range={RANGES.adm} setter={setADM} value={adm}>
              Attack Dice Modifier
            </MySlider>
            <MySlider range={RANGES.dd} setter={setDD} value={dd}>
              Defense Dice
            </MySlider>
            <MySlider range={RANGES.dw} setter={setDW} value={dw}>
              Defending Warbands
            </MySlider>
          </div>
          <div className="dice-plot-container">
            <DicePlot data={data} width={500} height={480}/>
          </div>
           <hr/>
          <div className="info">
             <p>Expected remaining attacking warbands: {data.expectedBands.toFixed(2)}; Δ = {(data.expectedBands - data.scenario.attackWarbands).toFixed(2)}</p>
            <div className="assumptions">
            <p>The simulator makes a number of assumptions about player behavior:</p>
            <ol>
              <li>An attack die is rolled for every attacking warband, adjusted by the modifier value.</li>
              <li>If it is possible for the attacker to win by sacrificing warbands, they will sacrifice the minimal number to be victorious.</li>
              <li>If it is impossible for the attacker to win, they will not sacrifice any warbands.</li>
            </ol>
            </div>
          </div>
        </div>
      </div>
      <p className="oath-symbol">12!@+-~$%7&=abdhnoCMRSTt</p>
      <footer></footer>
    </div>
  );
}
