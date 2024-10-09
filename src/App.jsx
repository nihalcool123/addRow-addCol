import './App.css';
import { useState } from 'react';

function App() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [grid, setGrid] = useState(createGrid(2, 2));

  function createGrid(rows, cols) {
    const data = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push('');
      }
      data.push(row);
    }
    return data;
  }

  const addRows = () => {
    setRows(rows + 1);
    setGrid(createGrid(rows + 1, cols));
  };

  const addCols = () => {
    setCols(cols + 1);
    setGrid(createGrid(rows, cols + 1));
  };

  const calculateFormula = (formula) => {
    const numbers = formula
      .substring(1)
      .split('+')
      .map((num) => parseFloat(num.trim()) || 0);

    return numbers.reduce((sum, num) => sum + num, 0);
  };

  const handleCellValueChange = (rowIndex, columnIndex, value) => {
    const data = [...grid];
    data[rowIndex][columnIndex] = value;
    setGrid(data);
  };

  return (
    <>
      <div>
        <table>
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleCellValueChange(
                          rowIndex,
                          cellIndex,
                          e.target.value
                        )
                      }
                      onBlur={(e) => {
                        if (e.target.value.startsWith('=')) {
                          const result = calculateFormula(e.target.value);
                          handleCellValueChange(rowIndex, cellIndex, result);
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <button onClick={addRows}>Add Row</button>
      <button onClick={addCols}>Add Column</button>
    </>
  );
}

export default App;
