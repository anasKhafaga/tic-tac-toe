const boardContainerRoot = document.querySelector('#board-container-root');
const player1 = 'X'
const player2 = 'O'
let winner = 'X';

function Block(){
  return (
    <div className="col-4 tl"></div>
  )
}

class Row1 extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="row g-0">
          {/*<div className="col-4 tl"></div>
          <div className="col-4 tm"></div>
          <div className="col-4 tr"></div>*/}
          <Block />
          <Block />
          <Block />
      </div>
    )
  }
}

function Row2() {

  if(winner == 'X'){
    return (
      <div className="row g-0">
          {/*<div className="col-4 ml">{player1}</div>
          <div className="col-4 mm">{player1}</div>
          <div className="col-4 mr">{player1}</div>*/}
          <Block />
          <Block />
          <Block />
      </div>
    )

  }else {
    return (
      <div className="row g-0">
          {/*<div className="col-4 ml">{player2}</div>
          <div className="col-4 mm">{player2}</div>
          <div className="col-4 mr">{player2}</div>*/}
          <Block />
          <Block />
          <Block />
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
          {/*<div className="col-4 bl"></div>
          <div className="col-4 bm"></div>
          <div className="col-4 br"></div>*/}
          <Block />
          <Block />
          <Block />
      </div>
    )
  }
}

class Board extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div className="bk-color-2 w-100 h-75 grid board row g-0" id="board-root">
        <Row1 />
        <Row2 />
        <Row3 />
      </div>
    )
  }
}

ReactDOM.render(<Board />, boardContainerRoot)
