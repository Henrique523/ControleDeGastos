import styled from 'styled-components'
import { lighten } from 'polished'

export const HeaderComponent = styled.div`
  width: 100%;
  height: 56px;
  background: #03045e;
  padding: 0 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 18px;
  color: #fbfbfb;
`

export const ButtonIcon = styled.button`
  border: 0;
  padding: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #03045e;
  transition: background-color 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  & {
    margin-left: auto;
  }

  & + & {
    margin-left: 16px;
  }

  &:hover {
    background: ${lighten(0.08, '#03045e')};
  }

  svg {
    margin: 5px 2px 0 0;
  }
`
