import Plot from "react-plotly.js";
import * as React from "react";

export default function DicePlot(props) {
  const data = props.data;
  const winData = {
    x: data.remaining,
    y: data.remainingWinProb,
    type: "bar",
    mode: "lines+markers",
    name: "Prob att win",
    marker: { color: "lightcoral" }
  };
  const defData = {
    x: data.remaining,
    y: data.remainingLoseProb,
    type: "bar",
    mode: "lines+markers",
    name: "Prob def win",
    marker: { color: "skyblue" }
  };

  const percents = {
    x: data.remaining,
    y: data.winPercents,
    name: "% to win",
    type: "scatter",
    mode: "lines",
    yaxis: "y2",
    line: { color: "grey", dash: "dash" }
  };

  const yaxis2 = {
    title: "% chance to win AND retain ≥  X warbands",
    titlefont: {
      size: 12
    },
    hoverformat: "d",

    font: {
      size: 14
    },
    overlaying: "y",
    side: "right",
    range: [0, 100]
  };

  const attackDice =
    data.scenario.attackWarbands + data.scenario.attackDieModifier;

  const title = `Attack: ${attackDice}d${data.scenario.attackWarbands}w vs Defense:${data.scenario.defenseDice}d${data.scenario.defenseWarbands}w`;
  
  
  const xaxis = {
    autotick: false,
    title: "# attacker warbands remaining",
    titlefont: {
      size: 16
    },
    font: {
      size: 18
    }
  };

  return (
    <Plot
      data={[winData, defData, percents]}
      style={{ width: props.width, height: props.height }}
      layout={{
        margin: { t: 36, b: 36, l: 28, r: 36, pad: 5 },
        showlegend: false,
        barmode: "stack",
        title,
        titlefont: {
          family: "Goudy Old Style, sans-serif",
          size: 18
        },
        font: {
          family: "Goudy Old Style, sans-serif"
        },
        xaxis,
        yaxis: {
          showgrid: false,
          autotick: true
        },
        yaxis2,
        autosize: true,
        paper_bgcolor: "ivory",
        plot_bgcolor: "ivory"
      }}
      config={{ displayModeBar: false, responsive: true, scrollZoom: false }}
    />
  );
}
