import styled from 'styled-components'

export const Detailed = styled.div`
  margin-top: 16px;
  padding: 8px;
  width: 100%;

  background: #023e8a;
  border-radius: 12px;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  transition: transform 0.2s;

  &:hover {
    transform: translateX(8px);
  }

  .specific-spend-tag {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #03045e;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #caf0f8;
      font-size: 16px;
    }
  }

  .column-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
  }

  .info-column-data,
  .specific-spend-category {
    display: flex;
    align-items: center;
  }

  .specific-spend-strong {
    color: #fbfbfb;
    line-height: 24.55px;
  }

  .specific-spend-p {
    margin-left: 4px;
    font-size: 14px;
    color: #caf0f8;
  }
`
