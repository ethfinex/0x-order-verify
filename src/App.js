import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {ZeroEx} from '0x.js'

class App extends Component {
  constructor (props) {
      super(props)
      this.state = {order: '',
                    hash: ''}

      this.handleOrderChange = this.handleOrderChange.bind(this)
      this.handleHashChange = this.handleHashChange.bind(this)
      this.handleVerify = this.handleVerify.bind(this)
    }

    handleOrderChange (e) {
      this.setState({order: e.target.value})
    }

    handleHashChange (e) {
      this.setState({hash: e.target.value})
    }

    handleVerify () {
      if(this.state.order === '') {
        alert('Please first paste in a 0x order')
        return
      } else if (this.state.hash === '') {
        alert('Please first paste in a 0x hash')
        return
      }
      console.log('Order: ' + this.state.order)
      console.log('Hash: ' + this.state.hash)
      console.log('Starting verification')

      try {
        JSON.parse(this.state.order)
      } catch (e) {
        alert('The order must be in json format i.e. {\'key\':\'value\',...}')
        return
      }

      let calculatedOrderHash = ZeroEx.getOrderHashHex(JSON.parse(this.state.order))
      console.log(calculatedOrderHash)
        if(ZeroEx.isValidOrderHash(this.state.hash)) {
          if(calculatedOrderHash === this.state.hash) {
            alert('The hash is correct!')
          } else {
            alert('The hash does not match the order')
          }
        }
        else {
          alert('The hash should look be in the following format 0x4jdsf...')
        }
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">0x order verification tool</h1>
        </header>
        <p className="App-intro">
          To verify that a hash is correct before signing it, copy a 0x order and hash into the boxes below:
        </p><br></br><br></br>
        <form>
        <b>Order parameters (json format):</b><br></br>
        <input type="textarea" className="App-inputbox" onChange={this.handleOrderChange} value={this.state.order} placeholder="{&quot;expirationUnixTimestampSec&quot;:&quot;1507056275&quot;,&quot;feeRecipient&quot;:&quot;0xe73a1998ce936acebeb7899..."/><br>
        </br><br></br><b>Hashed order (to verify before signing):</b><br></br>
        <input type="text" className="App-inputbox" onChange={this.handleHashChange} value={this.state.hash} placeholder="0xf53a1j98ce6993dxebeb7899..."/><br></br><br></br>
        <input type="submit" className="App-button" value="Verify" onClick={this.handleVerify}/>
        </form>
        <div className="App-efx">
          This tool was created open source by <a href="https://www.ethfinex.com">Ethfinex</a> and the source code can be found <a href="https://github.com/plutoegg/0x-order-verify"> on Github </a>
        </div>
      </div>
    )
  }
}

export default App;
