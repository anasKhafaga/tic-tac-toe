const gameRoot = document.querySelector('#root')

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

function Modal() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [avatar, setAvatar] = React.useState('');

  function changeHandler(e) {
    switch (e.target.name) {
      case 'username':
        setUsername(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      case 'bio':
        setBio(e.target.value)
        break;
      case 'gender':
        setGender(e.target.value)
        break;
      case 'avatar':
        setAvatar(e.target.value)
        break;
      default:

    }
  }

  function submitHandler(e) {
    console.log(username, password, bio, gender, avatar);

    e.preventDefault()
  }

  return (
    <div className="modal fade" id="form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <form action="#" onSubmit={submitHandler}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create A User</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" onChange={changeHandler} className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" onChange={changeHandler} className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea type="text" name="bio" onChange={changeHandler} className="form-control"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" id="gender" onChange={changeHandler} className="form-control">
                    <option value="">Please, Select</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="avatar">Avatar</label>
                  <input type="file" name="avatar" onChange={changeHandler} className="form-control-file" />
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Signup</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

class ModalClass extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
      bio: '',
      gender: '',
      avatar: ''
    }
  }

  submitHandler(e) {
    console.log(this.state);
    e.preventDefault()

  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <div className="modal fade" id="form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <form action="#" onSubmit={this.submitHandler.bind(this)}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create A User</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={this.changeHandler.bind(this)} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={this.changeHandler.bind(this)} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea type="text" name="bio" onChange={this.changeHandler.bind(this)} className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" onChange={this.changeHandler.bind(this)} className="form-control">
                      <option value="">Please, Select</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" name="avatar" onChange={this.changeHandler.bind(this)} className="form-control-file" />
                  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Signup</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function Game({gameOver, nilGame, announceWinner, setNilGame}) {

  const [xScore, setXScore] = React.useState(0);
  const [oScore, setOScore] = React.useState(0)
  const [nilScore, setNilScore] = React.useState(0)

  return (
    <React.Fragment>
      <Result xScore={xScore} oScore={oScore} nilScore={nilScore} />
      <Board xWins={() => setXScore(xScore + 1)} nil={() => setNilScore(nilScore + 1)} oWins={() => setOScore(oScore + 1)} gameOver={gameOver} nilGame={nilGame} announceWinner={announceWinner} setNilGame={setNilGame} />
      <ModalClass />
    </React.Fragment>
  )
}

function App() {

  const [gameOver, setGameOver] = React.useState(false)
  const [nilGame, setNilGame] = React.useState(false)

  return (
    <div className="container-float">
        <header style={{height: "7vh"}} className="row g-0 px-5 py-2 bk-color-2">
            <h2 className="row align-items-center col-7 g-0">Tic Tac Toe Game</h2>
            <button type="button" className="btn bk-color-1 col-2 g-0 h-100 row align-items-center" data-toggle="modal" data-target="#form">
              Sign up
            </button>
            <div className="row col-3 g-0 justify-content-end align-items-center h-100">
                <div className="bk-color-1 restart-ico clickable">
                    <img src="restart.png" alt="" onClick={() => {setGameOver(false); setNilGame(false)}} />
                </div>
            </div>
        </header>
        <div className="row w-100 g-0 col-rev vh-93">
            <aside className="col-md-3 px-5 py-5 bk-color-1 g-0">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Tic Tac Toe</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Defintion by wikipedia</h6>
                        <p className="card-text fs-6" style={{textAlign: "justify"}}><small>Tic-tac-toe (American English), noughts and crosses (Commonwealth English), or Xs and Os (Irish English) is a paper-and-pencil game for two players who take turns marking the spaces in a three-by-three grid with X or O. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. It is a solved game, with a forced draw assuming best play from both players.</small>
                        </p>
                        <p className="text-end">
                            <small>
                                <a href="https://en.wikipedia.org/wiki/Tic-tac-toe" className="card-link">LEARN MORE</a>
                            </small>
                        </p>
                    </div>
                </div>
            </aside>
            <main className="col-md-9 g-0 row h-100 p-5" id="game">
                <Game gameOver={gameOver} nilGame={nilGame} announceWinner={() => setGameOver(true)} setNilGame={() => {setGameOver(true); setNilGame(true)}} />
            </main>
        </div>
    </div>
  )
}

ReactDOM.render(<App />, root)
