import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import logo from './logo.svg';
import './App.css';

let scrollTop = 0;

function onScroll() {
  scrollTop = document.documentElement.scrollTop;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: true,
    };
    this.appRef = React.createRef();
  }

  renderLoremIpsum(num) {
    return [...new Array(num)].map(() => {
      return (
          <p key={Math.random()}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ornare odio. Pellentesque vitae sem
              porttitor, convallis lorem sit amet, finibus mauris. Vivamus pharetra egestas magna ac suscipit. Aenean
              aliquet metus odio, non fermentum ex vulputate nec. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Vestibulum rutrum laoreet nisl eu feugiat. Nunc laoreet eu odio sit amet mollis. Suspendisse a
              velit tristique, condimentum nunc eu, lobortis lorem. Aliquam eget dolor iaculis, aliquam felis nec,
              vulputate est. Curabitur pellentesque metus in hendrerit fermentum. Morbi feugiat porta rutrum. Maecenas
              mollis mauris nisl, eu porttitor magna mollis in. Phasellus vestibulum sapien vel est ultrices fermentum.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed elit
              nunc, eleifend quis pharetra in, vulputate et elit. Phasellus non faucibus arcu.</p>
      );
    })
  }

  renderButton() {
    const {isModalOpened} = this.state;
    return <p>
      <button className="btn btn-primary"
              onClick={() => this.setState({
                isModalOpened: !isModalOpened,
              })}
      >Show overlap
      </button>
    </p>;
  }

  componentDidMount() {
    document.addEventListener('scroll', onScroll);
  }

  render() {
    const {isModalOpened} = this.state;
    return (
        <div className={'App ' + (isModalOpened ? 'App--modal-opened' : '')}
             ref={this.appRef}
             style={{top: isModalOpened ? -scrollTop : null}}
        >
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-intro">
            <p>
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
          <div className="container">
            {this.renderButton()}
            {this.renderLoremIpsum(5)}
            {this.renderButton()}
            {this.renderLoremIpsum(5)}
            {this.renderButton()}
          </div>
          {ReactDOM.createPortal((
              <CSSTransition
                  in={isModalOpened}
                  timeout={400}
                  classNames="mmodal-root-"
                  unmountOnExit
                  onEnter={() => {
                    window.scrollTo(0, 0);
                  }}
                  onExited={() => {
                    window.scrollY = this.bodyScrollPos;
                    this.bodyScrollPos = document.documentElement.scrollTop;
                    this.bodyScrollPos = -1;
                    this.setState({
                      isModalOpened: false,
                    });
                  }}
              >
                <div className="mmodal-root">
                  <div onClick={() => this.setState({isModalOpened: false})}
                       className="mmodal__close"
                  >x
                  </div>
                  <div className="mmodal">
                    <div className='container'>
                      <h1>Title Title Title Title Title Title </h1>
                      {this.renderLoremIpsum(20)}
                    </div>
                  </div>
                </div>
              </CSSTransition>
          ), document.body)}
        </div>
    );
  }
}

export default App;
