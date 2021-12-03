const boardContainerRoot = document.querySelector('#board-container-root');
const player1 = 'X'
const player2 = 'O'
let winner = 'X';

function Block({classProp}){

  function checkBlock(e) {
    e.target.textContent = 'X' // let's cheat again :P
  }

  return (
    <div className={classProp} onClick={checkBlock}></div>
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

  render() {
    return(
      <div className="bk-color-2 w-100 h-75 grid board row g-0" id="board-root">
        <Row1 classProp="row g-0" />
        <Row2 classProp="row g-0" />
        <Row3 classProp="row g-0" />
      </div>
    )
  }
}

ReactDOM.render(<Board />, boardContainerRoot)
