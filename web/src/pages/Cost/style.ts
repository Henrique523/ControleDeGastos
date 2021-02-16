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

  animation: ${appear} 1s;

  .cost-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cost-form input,
  .cost-form select {
    height: 48px;
    width: 23vw;

    padding: 8px;

    border: 1px solid #000;
    border-radius: 8px;

    &::placeholder {
      font-size: 16px;
      color: #000;
    }
  }

  .register-form-button {
    margin-top: 24px;

    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
`
