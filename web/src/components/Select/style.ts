import styled from 'styled-components'
import ReactSelect from 'react-select'

export const SelectComponent = styled(ReactSelect)`
  .react-select__control {
    height: 48px;
    width: 23vw;

    padding: 8px;

    border: 1px solid #000;
    border-radius: 8px;

    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .react-select__control--menu-is-open,
  .react-select__control--is-focused {
    box-shadow: 0 0 0 1px #000;
  }

  .react-select__control:hover {
    border-color: #000;
  }

  .react-select__value-container {
    height: 48px;
    margin-top: -9px;

    font-family: 'Nunito' sans-serif;
    font-size: 16px;

    display: contents;
  }

  .react-select__indicators {
    height: 48px;
    margin-top: -9px;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__dropdown-indicator,
  .react-select__dropdown-indicator:hover {
    color: #000;
  }

  .react-select__placeholder {
    font-size: 16px;
    color: #000;
  }
`
