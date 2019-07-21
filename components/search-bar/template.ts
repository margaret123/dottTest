export default `
    <style>
        .search-container {
            width: 60%;
            margin: 0 auto;
            border: 1px solid #eee;
            border-bottom: 2px solid #eee;
            display: flex;
            flex-direction: row;
            height: 34px;
            margin-bottom: 20px;
            justify-content: space-between;
        }
        .search-container input {
            font-size: 14px;
            padding: 5px;
            height: 34px;
            flex-grow: 2;
            border: 0;
        }
        .microphone {
            width: 30px;
        }
        .voice-button {
            width: 12px;
            height: 29px;
            background: #eee;
            border-radius: 6px;
            position: relative;
            margin-left: 10px;
        }
        .voice-button:before {
            content:"";
            position: absolute;
            bottom: -5px;
            left: -4px;
            width: 20px;
            height: 3px;
            background: #eee;
        }
        .voice-button:after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: -5px;
            width: 16px;
            height: 12px;
            border: 3px solid #eee;
            border-top: 3px solid #fff;
            border-radius: 0 0 8px 8px;
        }
    </style>
    <div class="search-container">
        <input type="search" placeholder="Search" class="search-input" />
        <div class="microphone">
            <div class="voice-button"></div>
        </div>
        
    </div>
`;