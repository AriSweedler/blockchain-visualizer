import React from 'react';
import Hash from './Hash.tsx';

export default function Block({ hash, blockState }) {
  const color = `#${hash.slice(0, 6)}`;
  const blockStyle = {
    border: `1em solid ${color}`,
    backgroundColor: "#333",
    margin: "1em",
    padding: "1em",
  };

  const h3Style = {
    margin: "0",
  }

  const tableStyle = {
    width: '100%',
    backgroundColor: "#222",
    borderCollapse: 'collapse',
    color: '#fff',
  };

  const thTdStyle = {
    border: '1px solid #444',
    padding: '0.5em',
    textAlign: 'left',
  };

  return (
    <div style={blockStyle}>
      <h3 style={h3Style}>THIS <Hash hash={hash} /></h3>
      <div>Parent: <Hash hash={blockState.parent} /></div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Field</th>
            <th style={thTdStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={thTdStyle}>Data</td>
            <td style={thTdStyle}><code>{JSON.stringify(blockState.data)}</code></td>
          </tr>
          <tr>
            <td style={thTdStyle}>Salt</td>
            <td style={thTdStyle}>{blockState.salt}</td>
          </tr>
          <tr>
            <td style={thTdStyle}>Miner</td>
            <td style={thTdStyle}>{blockState.miner}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
