const gameRoot = document.querySelector('#game')
const player1 = 'X'
const player2 = 'O'

function Block({classProp, click}){

  return (
    <li className={classProp} onClick={click}></li>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props)

    // define a state
    this.state = {
      currentPlayer: 'X',
      boardMap: [['tl', 'tm', 'tr'], ['ml', 'mm', 'mr'], ['bl', 'bm', 'br']]
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


    // extract all values
    const [[tl, tm, tr], [ml, mm, mr], [bl, bm, br]] = this.state.boardMap.map(row => {
      return row.map(blk => {
        return document.querySelector(`.${blk}`).textContent
      })
    })
    // check who wins
    if (
      (tl == tm && tm == tr && tl != '') ||
      (ml == mm && mm == mr && ml != '') ||
      (bl == bm && bm == br && bl != '') ||
      (tl == ml && ml == bl && tl != '') ||
      (tm == mm && mm == bm && tm != '') ||
      (tr == mr && mr == br && tr != '') ||
      (tl == mm && mm == br && tl != '') ||
      (tr == mm && mm == bl && tr != '')
    ){

      if(this.state.currentPlayer == 'X'){
        this.props.xWins()
      }else {
        this.props.oWins()
      }

      return this.props.announceWinner();

    }

    // check if game is nil
    if(tl && tm && tr && ml && mm && mr && bl && bm && br){
      this.props.nil()
      return this.props.setNilGame();
    }

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
      <div className="col-8 h-100 g-0 row align-items-center" id="board-container-root">
        <div className="bk-color-2 w-100 h-75 grid board row g-0" id="board-root" onClick={this.toggleColor.bind(this, 'bk-color-3')}>
        {this.props.nilGame? (
          <h3>Nil</h3>
        ) : (
          this.props.gameOver? (
            <h3>{`${this.state.currentPlayer} wins`}</h3>
          ) : (
            <React.Fragment>
              {this.state.boardMap.map((row, rowIdx) => {
                return (
                  <ul className="row g-0" key={rowIdx}>
                    {row.map((blk, blkIdx) => {
                      return <Block key={blkIdx} classProp={`col-4 ${blk}`} click={this.checkBlock.bind(this)} />
                    })}
                  </ul>
                )
              })}
            </React.Fragment>
          )
        )}
        </div>
      </div>
    )
  }
}

function ResultBlock({player, score}) {
  return (
    <div className="row g-0">
        <div className="col-4">{player}</div>
        <div className="col-4"><img src="heart.png" alt="" /></div>
        <div className="col-4">{score}</div>
    </div>
  )
}

function Result({xScore, oScore, nilScore}) {

  return (
    <div className="col-4 h-100 g-0 row align-items-center" id="results">
      <div className="w-100 h-75 grid results row g-0">
        <ResultBlock player='X' score={xScore} />
        <ResultBlock player='=' score={nilScore} />
        <ResultBlock player='O' score={oScore} />
      </div>
    </div>
  )
}

function Game() {

  const [xScore, setXScore] = React.useState(0);
  const [oScore, setOScore] = React.useState(0)
  const [nilScore, setNilScore] = React.useState(0)

  const [gameOver, setGameOver] = React.useState(false)
  const [nilGame, setNilGame] = React.useState(false)

  return (
    <React.Fragment>
      <Result xScore={xScore} oScore={oScore} nilScore={nilScore} />
      <Board xWins={() => setXScore(xScore + 1)} nil={() => setNilScore(nilScore + 1)} oWins={() => setOScore(oScore + 1)} gameOver={gameOver} nilGame={nilGame} announceWinner={() => setGameOver(true)} setNilGame={() => {setGameOver(true); setNilGame(true)}} />
    </React.Fragment>
  )
}

ReactDOM.render(<Game />, gameRoot)
