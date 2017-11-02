import React, { Component } from 'react'
import { ZeroEx } from '0x.js'
import Textarea from 'react-textarea-autosize'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      order: '',
      hash: '',
      success: false,
      error: ''
    }

    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handleHashChange = this.handleHashChange.bind(this)
    this.handleVerify = this.handleVerify.bind(this)
  }

  handleOrderChange (e) {
    let parsedJson = e.target.value
    let error = null
    try {
      parsedJson = JSON.parse(e.target.value)
    } catch (e) {
      // silence error, user could be typing
      error = e
    }
    this.setState({
      order: (error) ? parsedJson : JSON.stringify(parsedJson, undefined, 2),
      error: '',
      success: false
    })
  }

  handleHashChange (e) {
    this.setState({
      hash: e.target.value,
      error: '',
      success: false
    })
  }

  handleVerify () {
    if (this.state.order === '') {
      this.setState({
        error: 'Please first paste in a 0x order.'
      })
      return
    } else if (this.state.hash === '') {
      this.setState({
        error: 'Please first paste in a 0x hash.'
      })
      return
    }

    try {
      JSON.parse(this.state.order)
    } catch (e) {
      this.setState({
        error: 'Order must be in JSON format i.e. {\'key\':\'value\',...}'
      })
      return
    }

    let calculatedOrderHash =
      ZeroEx.getOrderHashHex(JSON.parse(this.state.order))
    if (ZeroEx.isValidOrderHash(this.state.hash)) {
      if (calculatedOrderHash === this.state.hash) {
        this.setState({success: true})
      } else {
        this.setState({
          error: 'The hash does not match the order.'
        })
      }
    } else {
      this.setState({
        error: 'The hash should look be in the following format 0x4jdsf...'
      })
    }
  }

  renderTextAreaDiv (params = {}) {
    const {
      _text,
      _className,
      _onChange,
      _value,
      _placeholder
    } = params
    return (
      <div className='App-div-input'>
        <b>{_text}</b>
        <Textarea
          className={_className}
          onChange={_onChange}
          value={_value}
          placeholder={_placeholder}
          style={{'padding': '20px'}}
          />
      </div>
    )
  }

  renderForm () {
    const orderParam = {
      _text: 'Order parameters (JSON format):',
      _className: 'App-textarea',
      _onChange: this.handleOrderChange,
      _value: this.state.order,
      _placeholder: '{"expirationUnixTimestampSec": 1507056275, ' +
        '"feeRecipient": 0xe73a1998ce936acebeb7899...'
    }
    const hashParam = {
      _text: 'Hashed order (to verify before signing):',
      _className: 'App-textarea',
      _onChange: this.handleHashChange,
      _value: this.state.hash,
      _placeholder: '0xf53a1j98ce6993dxebeb7899...'
    }
    return (
      <div className='App-body-container'>
        <form className='App-form'>
          {this.renderTextAreaDiv(orderParam)}
          {this.renderTextAreaDiv(hashParam)}
          <div className='App-div-submit'>
            <input
              type={'button'}
              className={'App-button'}
              value={'Verify'}
              onClick={this.handleVerify} />
          </div>
        </form>
      </div>
    )
  }

  renderAlert () {
    if (this.state.success) {
      return (
        <div className='App-body-container'>
          <div className='App-alert-green'>
            <div>The hash is correct!</div>
          </div>
        </div>
      )
    } else if (this.state.error !== '') {
      return (
        <div className='App-body-container'>
          <div className='App-alert-red'>
            <div>{this.state.error}</div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'><b>0x</b> Order Verification Tool</h1>
        </header>
        <div className='App-body'>
          <div className='App-body-container'>
            <p className='App-intro'>
              To verify that a hash is correct before signing it,
              copy a 0x order and hash into the boxes below:
            </p>
          </div>
          {this.renderAlert()}
          {this.renderForm()}
          <div className='App-body-container'>
            This tool was created open source by &thinsp;
            <a href='https://www.ethfinex.com'>Ethfinex</a>
            &thinsp; and the source code can be found on &thinsp;
            <a href='https://github.com/plutoegg/0x-order-verify'>
              Github
            </a>
            .
          </div>
        </div>
      </div>
    )
  }
}

export default App
