const boardContainerRoot = document.querySelector('#board-container-root');
const resultContainerRoot = document.querySelector('#results')
const player1 = 'X'
const player2 = 'O'
let winner = 'X';

function Block({classProp}){

  function checkBlock(e, player) {
    e.target.textContent = player
  }

  return (
    <div className={classProp} onClick={(e) => checkBlock(e, 'X')}></div>
  )
}

class Row1 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classProp} = this.props
    return (
      <div className={classProp}>
          <Block classProp="col-4 tl" />
          <Block classProp="col-4 tm" />
          <Block classProp="col-4 tr" />
      </div>
    )
  }
}

function Row2({classProp}) {

  if(winner == 'X'){
    return (
      <div className={classProp}>
          <Block classProp="col-4 ml" />
          <Block classProp="col-4 mm" />
          <Block classProp="col-4 mr" />
      </div>
    )

  }else {
    return (
      <div className={classProp}>
          <Block classProp="col-4 ml" />
          <Block classProp="col-4 mm" />
          <Block classProp="col-4 mr" />
      </div>
    )
  }

};

class Row3 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classProp} = this.props
    return (
      <div className={classProp}>
          <Block classProp="col-4 bl" />
          <Block classProp="col-4 bm" />
          <Block classProp="col-4 br" />
      </div>
    )
  }
}

class Board extends React.Component {
  constructor() {
    super()
  }

  toggleColor(classParam, e) {
    e.currentTarget.classList.toggle(classParam);

    console.log(this);
  }

  render() {
    return(
      <div className="bk-color-2 w-100 h-75 grid board row g-0" id="board-root" onClick={this.toggleColor.bind(this, 'bk-color-3')}>
        <Row1 classProp="row g-0" />
        <Row2 classProp="row g-0" />
        <Row3 classProp="row g-0" />
      </div>
    )
  }
}

function ResultBlock({player, score, click}) {
  return (
    <div class="row g-0">
        <div class="col-4">{player}</div>
        <div class="col-4"><img src="heart.png" alt="" onClick={click} /></div>
        <div class="col-4">{score}</div>
    </div>
  )
}

function Result() {


  const [xScore, setXScore] = React.useState(0);
  const [oScore, setOScore] = React.useState(0)
  const [nilScore, setNilScore] = React.useState(0)

  return (
    <div class="w-100 h-75 grid results row g-0">
      <ResultBlock player='X' score={xScore} click={() => setXScore(xScore + 1)} />
      <ResultBlock player='=' score={nilScore} click={() => setNilScore(nilScore + 1)} />
      <ResultBlock player='O' score={oScore} click={() => setOScore(oScore + 1)} />
    </div>
  )
}

ReactDOM.render(<Board />, boardContainerRoot)
ReactDOM.render(<Result />, resultContainerRoot)
