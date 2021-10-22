import { createGlobalStyle } from "styled-components";
import "./vars.css";
const config =
  (attr) =>
  ({ config }) =>
    config[attr];

export default createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    svg{
        fill: ${config("accentColor")};
    }
    .ezr-table{
        box-shadow: var(--shadow);
        border-radius: 7px;
        width: ${config("tableWidth")}px;
    }
    .ezr-header{
        display: flex;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
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
        box-shadow: var(--shadow);
        height: 35px;
        input {
            width: calc(100% - 45px);
            border: none;
            outline: none;
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
            border: none;
            outline: none;
            background: transparent;
            top: 10px;
            bottom: 0;
            right: 5px;
            height: 100%;
            position: absolute;
            line-height: 2rem;
            svg{
                transform: scale(80%);
                animation: rotation 1s linear infinite forwards;
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
        border-bottom: 1px solid #eee;
        .ezr-col-header-cell{
            display: flex;
            position: relative;
            align-items: center;
            font-weight: bold;
            padding-left: 10px;
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
    }
    .ezr-footer{
        border-top: 1px solid #eee;
        display: flex;
        padding: 15px 0;
        justify-content: center;
        color: ${config("accentColor")};
        & > *+*{
            margin-left: 5px;
        }
    }
`;
