import React, {useState} from 'react'
import { PieChart, Pie, Cell, Sector } from 'recharts';

// Get extra information piechart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const upperCaseName = jsUcfirst(payload.name);

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}   
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${upperCaseName}: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#eeeeee">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function KeywordPie(props) {

  // Code from Recharts
  const [activeIndex, setIndex] = useState(0);
  const onPieEnter = (data, index) => {
    setIndex(index);
  };

  if (!props.moods) return <p>Loading...</p>;

  const onlyHappy = props.moods.reduce((arr, mood) => {
    if (mood.mood === 'happy') {mood.keywords.forEach(word => arr.push(word))};
    return arr;
  }, []);

  const getAmount = (word) => {
    let regex = new RegExp(word, "g");
    return onlyHappy.toString().match(regex) ? onlyHappy.toString().match(regex).length : 0;
  };

  const keywords = ['work', 'weekend', 'family', 'friends', 'coding', 'reading', 'dancing', 'drinking', 'date', 'daylightlamp'];

  const newWords = onlyHappy.reduce((arr, key) => {
    if (!keywords.includes(key)) { arr.push(key)};
    return arr;
  }, []);

  const allKeywords = keywords.concat(newWords);
  
  const happyData = allKeywords.reduce((arr, word) => {
    arr.push({
      "name": word,
      "value": getAmount(word)
    })
    return arr;
  }, []);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={750} height={300}>
      <Pie
        data={happyData}
        cx={200}
        cy={100}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        onMouseEnter={onPieEnter}
      >
      {
        happyData.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
      }
      </Pie>
    </PieChart>
  )
}

