import styled, { keyframes } from 'styled-components'

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Title = styled.h2`
  margin: 32px 0 0 24px;
  font-size: 40px;

  animation: ${appear} 1s;
`

export const Form = styled.form`
  margin: 32px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  animation: ${appear} 1s;

  input {
    width: 300px;
    height: 48px;

    padding-left: 8px;

    border: 1px solid #000;
    border-radius: 8px;
  }
`
