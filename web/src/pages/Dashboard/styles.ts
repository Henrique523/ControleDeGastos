import styled, { keyframes } from 'styled-components'

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-84px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(84px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: 32px 184px 0;

  form {
    display: flex;
    align-items: center;

    margin-left: auto;

    input {
      margin-right: 16px;
      padding: 0 8px;

      border: 1px solid #000;
      border-radius: 8px;
      width: 280px;
      height: 48px;

      font-size: 16px;
    }
  }
`

export const DashboardCards = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 32px;
`

export const ResumedSpends = styled.div`
  display: flex;
  flex-direction: column;

  animation: ${appearFromLeft} 1s;
`

export const CardFutureSpends = styled.div`
  margin-top: 32px;
  padding: 16px 24px 24px;
  width: 33vw;
  height: 300px;
  margin-right: 8px;

  background: #0077b6;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #fbfbfb;
    font-size: 20px;
  }
`

export const DetailedSpends = styled.div`
  margin-top: 32px;
  padding: 16px 24px 24px;
  width: 33vw;

  background: #0077b6;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromRight} 1s;

  h3 {
    color: #fbfbfb;
    font-size: 20px;
  }
`
