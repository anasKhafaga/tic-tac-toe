const boardRoot = document.querySelector('#board-root');
const player1 = 'X'
const player2 = 'O'
let winner = 'X';

class Row1 extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="row g-0">
          <div className="col-4 tl"></div>
          <div className="col-4 tm"></div>
          <div className="col-4 tr"></div>
      </div>
    )
  }
}

function Row2() {

  if(winner == 'X'){
    return (
      <div className="row g-0">
          <div className="col-4 ml">{player1}</div>
          <div className="col-4 mm">{player1}</div>
          <div className="col-4 mr">{player1}</div>
      </div>
    )

  }else {
    return (
      <div className="row g-0">
          <div className="col-4 ml">{player2}</div>
          <div className="col-4 mm">{player2}</div>
          <div className="col-4 mr">{player2}</div>
      </div>
    )
  }

};

class Row3 extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="row g-0">
          <div className="col-4 bl"></div>
          <div className="col-4 bm"></div>
          <div className="col-4 br"></div>
      </div>
    )
  }
}

ReactDOM.render([<Row1 />, <Row2 />, <Row3 />], boardRoot)
