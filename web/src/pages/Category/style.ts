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

export const FormLine = styled.div`
  margin: 32px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  animation: ${appear} 1s;
`
