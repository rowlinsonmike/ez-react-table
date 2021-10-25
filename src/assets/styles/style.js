import { createGlobalStyle } from "styled-components";
import "./vars.css";
const config = (attr) => ({ config }) => config[attr];

const getColor = ({ config: { darkMode } }) => {
  if (!darkMode) {
    return "#1e2026";
  } else {
    return "#fff";
  }
};

const getBorderColor = ({ config: { darkMode } }) => {
  if (!darkMode) {
    return "#7a7f8f";
  } else {
    return "#484848";
  }
};

const getShadow = ({ config: { darkMode } }) => {
  if (darkMode) {
    return "box-shadow: rgb(200 200 200/ 25%) 0px 50px 50px -10px, rgb(255 255 255 / 30%) 0px 30px 20px -30px, rgb(180 180 180 / 35%) 0px -2px 2px 0px inset;";
  } else {
    return "box-shadow: rgb(50 50 93 / 25%) 0px 50px 50px -10px, rgb(0 0 0 / 30%) 0px 30px 20px -30px, rgb(10 37 64 / 35%) 0px -2px 2px 0px inset;";
  }
};
const getBackgroundColor = ({ config: { darkMode } }) => {
  if (darkMode) {
    return "background: #1e2026;";
  } else {
    return "background: #fff;";
  }
};
const getFontColor = ({ config: { darkMode } }) => {
  if (darkMode) {
    return "color: #fff;";
  } else {
    return "color: #1e2026;";
  }
};
const getScrollBarColor = ({ config: { darkMode } }) => {
  if (darkMode) {
    return `
    .simplebar-scrollbar::before {
        background-color: #fff !important;
    }
    `;
  } else {
    return `
    .simplebar-scrollbar::before {
        background-color: #1e2026 !important;
    }
    `;
  }
};
export default createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    svg{
        fill: ${config("accentColor")};
    }
    ${getScrollBarColor}
    .ezr-table{
        ${getShadow}
        border-radius: 7px;
        width: ${config("tableWidth")}px;
        ${getBackgroundColor}
    }
    .ezr-header{
        display: flex;
        padding-bottom: 15px;
        &:hover{
            cursor: pointer;
        }
        .ezr-header-left,.ezr-header-right{
            width: 50%;
        }
        .ezr-header-right{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;
        }
    }

    .ezr-search{
        border-radius: 7px;
        position: relative;
        max-width: 50vw;
        width: 100%;
        margin: 10px 0 0 10px;
        overflow: hidden;
        ${getShadow}
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
            line-height: 2rem;
        }
    }
    .ezr-search-icon{
        fill: #1e2026;
    }
    .ezr-refresh{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        @keyframes rotation {
            100% {transform: scale(80%) rotate(-360deg);}
        }
        button{
            ${getShadow}
            border: none;
            outline: none;
            background: transparent;
            top: 10px;
            bottom: 0;
            right: 5px;
            height: 80%;
            position: absolute;
            line-height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 7px;
            .loader{
                width: 20px;
                height: 20px;
                border: 2px solid ${getColor};
                border-radius: 50%;
                animation: spin 5s linear infinite;
                position: relative; 
                background: transparent;
                &:before{
                    content: "";
                    display: block;
                    background: transparent;
                    width: 5px;
                    height: 5px;
                    border-top: 2px solid ${getColor};
                    border-right: 2px solid ${getColor};
                    position: absolute;
                    top: 0px;
                    left: -3px;
                    box-shadow: 4px -4px 0 1px ${({ config: { darkMode } }) =>
                      !darkMode ? "#fff" : "#1e2026"};
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }
    .ezr-count{
        display: flex;
        align-items: center;
        strong{
            font-size: 25px;
            color: #b8b8b8;
        }
        img{
            height: 18px;
            width: 18px;
        }
    }
    .ezr-col-header{
        padding: 0 10px;
        line-height: 2rem;
        margin-bottom: 10px;
        user-select: none;
        display: flex;
        cursor: pointer;
        align-items: center;
        transition: 0.3s;
        border-bottom: 1px solid ${getBorderColor};
        .ezr-col-header-cell{
            display: flex;
            position: relative;
            align-items: center;
            font-weight: bold;
            padding-left: 10px;
            ${getFontColor}
            & > *+*{
                margin-left: 5px;
            }
        }
    }
    .ezr-row{
        padding: 0 10px;
        &:hover {
            background: rgba(219, 219, 219, 50%);
            cursor: pointer;
        }

        display: flex;
        cursor: pointer;
        align-items: center;
        transition: 0.3s;
        .ezr-row-cell{
            ${getFontColor}
        }
    }
    .ezr-footer{
        border-top: 1px solid ${getBorderColor};
        display: flex;
        padding: 15px 0;
        justify-content: center;
        color: ${config("accentColor")};
        & > *+*{
            margin-left: 5px;
        }
    }
`;
