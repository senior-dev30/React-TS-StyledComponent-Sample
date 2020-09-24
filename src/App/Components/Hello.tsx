import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ButtonsView = styled.div`
  width: 125px;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  height: 50px;
  width: 50px;
  background-color: #999;
  border-radius: 6px;
  border-color: #999;
  font-size: 24px;
`

const Greeting = styled.h1`
  color: #999;
  font-weight: bold;
`

export interface IProps {
  name: string
  enthusiasmLevel?: number
}

interface IState {
  enthusiasmLevel: number
}

export default class Hello extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error('You could be a little more enthusiastic. :D')
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
    }
  }

  public onIncrement = () => {
    this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 })
  }
  public onDecrement = () => {
    const { enthusiasmLevel } = this.state
    if (enthusiasmLevel > 0) {
      this.setState({ enthusiasmLevel: enthusiasmLevel - 1 })
    }
  }
  public getExclamationMarks = (numChars: number) =>
    Array(numChars + 1).join('!')

  public render() {
    return (
      <Root>
        <Greeting>
          Hello{' '}
          {this.props.name +
            this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Greeting>
        <ButtonsView>
          <Button
            type="button"
            onClick={this.onDecrement}
            aria-label="decrement"
          >
            -
          </Button>
          <Button
            type="button"
            onClick={this.onIncrement}
            aria-label="increment"
          >
            +
          </Button>
        </ButtonsView>
      </Root>
    )
  }
}
