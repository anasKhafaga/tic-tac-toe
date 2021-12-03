const boardContainerRoot = document.querySelector('#board-container-root');
const resultContainerRoot = document.querySelector('#results')
const player1 = 'X'
const player2 = 'O'

function Block({classProp, click}){

  return (
    <div className={classProp} onClick={click}></div>
  )
}

class Board extends React.Component {
  constructor() {
    super()

    // define a state
    this.state = {
      currentPlayer: 'X'
    }
  }

  toggleColor(classParam, e) {
    e.currentTarget.classList.toggle(classParam);

    console.log(this);
  }

  checkBlock(e) {

    // update the state

    // check block is checked or not
    if(e.target.textContent) return;

    // update the block if not
    e.target.textContent = this.state.currentPlayer

    // update the game state to next player
    this.setState((state) => {
      if(state.currentPlayer == 'X'){
        return {currentPlayer: 'O'}
      }else{
        return {currentPlayer: 'X'}
      }
    })

  }

  render() {
    return(
      <div className="bk-color-2 w-100 h-75 grid board row g-0" id="board-root" onClick={this.toggleColor.bind(this, 'bk-color-3')}>
        <div className="row g-0">
            <Block classProp="col-4 tl" click={this.checkBlock.bind(this)} />
            <Block classProp="col-4 tm" click={this.checkBlock.bind(this)} />
            <Block classProp="col-4 tr" click={this.checkBlock.bind(this)} />
        </div>
        <div className="row g-0">
            <Block classProp="col-4 ml" click={this.checkBlock.bind(this)} />
            <Block classProp="col-4 mm" click={this.checkBlock.bind(this)} />
            <Block classProp="col-4 mr" click={this.checkBlock.bind(this)} />
        </div>
        <div className="row g-0">
            <Block classProp="col-4 bl" click={this.checkBlock.bind(this)} />
            <Block classProp="col-4 bm" click={this.checkBlock.bind(this)} />
            <Block classProp="col-4 br" click={this.checkBlock.bind(this)} />
        </div>
      </div>
    )
  }
}

function ResultBlock({player, score, click}) {
  return (
    <div className="row g-0">
        <div className="col-4">{player}</div>
        <div className="col-4"><img src="heart.png" alt="" onClick={click} /></div>
        <div className="col-4">{score}</div>
    </div>
  )
}

function Result() {


  const [xScore, setXScore] = React.useState(0);
  const [oScore, setOScore] = React.useState(0)
  const [nilScore, setNilScore] = React.useState(0)

  return (
    <div className="w-100 h-75 grid results row g-0">
      <ResultBlock player='X' score={xScore} click={() => setXScore(xScore + 1)} />
      <ResultBlock player='=' score={nilScore} click={() => setNilScore(nilScore + 1)} />
      <ResultBlock player='O' score={oScore} click={() => setOScore(oScore + 1)} />
    </div>
  )
}

ReactDOM.render(<Board />, boardContainerRoot)
ReactDOM.render(<Result />, resultContainerRoot)
