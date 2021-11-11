import styled from "styled-components";

const modes = {
  bg: ["#fff", "#1f2024"],
  font: ["#1f2024", "#fff"],
  border: ["#cbd2d9", "#323f4b"],
  scroll: ["#323f4b", "#cbd2d9"],
  scroll: ["#323f4b", "#cbd2d9"],
};

const getColor = (darkMode) => {
  let index = 0;
  if (darkMode) {
    index = 1;
  }
  return Object.keys(modes).reduce((a, c) => {
    a[c] = modes[c][index];
    return a;
  }, {});
};

export default styled.div`
  /* keyframes */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
  /* general */
  * {
    box-sizing: border-box;
  }
  svg {
    fill: ${({ accentColor }) => accentColor};
  }
  .simplebar-scrollbar::before {
    background-color: ${({ accentColor }) =>
      accentColor || getColor(darkMode).scroll} !important;
  }
  /* table */
  .ezr-table {
    box-shadow: #777 0px 1px 2px;
    border-radius: 7px;
    width: ${({ tableWidth }) => tableWidth}px;
    min-width: 300px;
    max-width: 100%;
    background-color: ${({ darkMode }) => getColor(darkMode).bg};
  }
  .ezr-title {
    .ezr-title--text {
      color: ${({ darkMode }) => getColor(darkMode).font};
    }
  }
  .ezr-header {
    display: flex;
    padding-bottom: 15px;
    &:hover {
      cursor: pointer;
    }
    .ezr-header-left,
    .ezr-toolbar {
      width: 50%;
    }
    .ezr-toolbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      & > * + * {
        margin-left: 5px;
      }
      .ezr-toolbar--button {
        box-shadow: ${({ darkMode }) =>
              darkMode ? "rgba(0, 0, 0, 0.12)" : "rgba(50, 50, 93, 0.25)"}
            0px 1px 3px,
          ${({ darkMode }) =>
              darkMode ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.3)"}
            0px 1px 2px;
        border: none;
        outline: none;
        background: transparent;
        top: 10px;
        bottom: 0;
        right: 5px;
        height: 30px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
        i {
        }
        svg {
        }
      }
    }
  }

  .ezr-search {
    border-radius: 7px;
    position: relative;
    max-width: 50vw;
    width: 100%;
    margin: 10px 0 0 10px;
    overflow: hidden;
    box-shadow: ${({ darkMode }) =>
          darkMode ? "rgba(0, 0, 0, 0.12)" : "rgba(50, 50, 93, 0.25)"}
        0px 1px 3px,
      ${({ darkMode }) =>
          darkMode ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.3)"}
        0px 1px 2px;
    height: 35px;
    background: #fff;
    input {
      width: calc(100% - 45px);
      border: none;
      outline: none;
      background: transparent;
      height: 100%;
      padding-left: 10px;
      line-height: 30px;
      font-size: 16px;
    }
    button {
      border: none;
      outline: none;
      background: transparent;
      top: 5px;
      bottom: 0;
      right: 5px;
      height: 100%;
      position: absolute;
      width: 30px;
      height: 30px;
    }
  }
  .ezr-search-icon {
    fill: #1e2026;
  }
  .ezr-count {
    display: flex;
    align-items: center;
    strong {
      font-size: 25px;
      color: #b8b8b8;
    }
    img {
      height: 18px;
      width: 18px;
    }
  }
  .ezr-col-header {
    padding: 0 10px;
    line-height: 2rem;
    margin-bottom: 10px;
    user-select: none;
    display: flex;
    cursor: pointer;
    align-items: center;
    transition: 0.3s;
    border-bottom: 1px solid ${({ darkMode }) => getColor(darkMode).border};
    .ezr-col-header-cell {
      display: flex;
      position: relative;
      align-items: center;
      font-weight: bold;
      padding-left: 10px;
      color: ${({ darkMode }) => getColor(darkMode).font};
      & > * + * {
        margin-left: 5px;
      }
    }
  }
  .ezr-row {
    padding: 0 10px;
    position: relative;
    &:hover {
      background: rgba(219, 219, 219, 50%);
      cursor: pointer;
    }
    display: flex;
    cursor: pointer;
    align-items: center;
    transition: 0.3s;
    .ezr-row-cell {
      color: ${({ darkMode }) => getColor(darkMode).font};
    }
  }
  .ezr-footer {
    border-top: 1px solid ${({ darkMode }) => getColor(darkMode).border};
    display: flex;
    padding: 15px 0;
    justify-content: center;
    color: ${({ accentColor, darkMode }) =>
      accentColor || getColor(darkMode).font};
    & > * + * {
      margin-left: 5px;
    }
  }
`;
