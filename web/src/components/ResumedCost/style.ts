import styled from 'styled-components'

export const Resumed = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 40px;
  margin-top: 16px;
  padding: 0 16px;
  background: #023e8a;

  border-radius: 8px;

  transition: transform 0.2s;

  &:hover {
    transform: translateX(8px);
  }

  .icon-and-date-or-category-and-value-resumed-cost {
    display: flex;
    align-items: center;
  }

  .icon-and-date-or-category-and-value-resumed-cost .icon-circle-resumed-cost {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #03045e;
    margin-right: 8px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: #caf0f8;
      font-size: 16px;
    }
  }

  .icon-and-date-or-category-and-value-resumed-cost .strong-category-or-date-resumed-cost,
  .icon-and-date-or-category-and-value-resumed-cost .value-description-resumed-cost {
    color: #fbfbfb;
    line-height: 24.55px;
  }

  .value-description-resumed-cost {
    margin-right: 4px;
  }

  .icon-and-date-or-category-and-value-resumed-cost p {
    color: #caf0f8;
    font-size: 14px;
  }
`
