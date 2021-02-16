import styled from 'styled-components'
import { shade } from 'polished'

export const ButtonComponent = styled.button`
  width: 200px;
  height: 48px;
  background: #023e8a;

  border: 0;
  border-radius: 8px;

  color: #fbfbfb;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#023e8a')};
  }
`
