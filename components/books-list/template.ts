export default `
    <style>
    :host {
        
    }
        .books-list {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 30px 0;
            background: var(--background-color);
            min-height: 100px;
        }
        loader-element {
            display: none;
        }
        .date-stamp {
            display: none;
        }
        .books-list ul {
            display: none;
            position: relative;
            left: 0;
            flex-direction: row;
            list-style: none;
        }
        .books-list ul.shown {
            display: flex;
            animation: slideshow 80s linear infinite;
        }
        .books-list ul.shown:hover {
            animation-play-state: paused;
        }
        .books-list ul  li {
            flex-grow: 1;
            background: #eee;
            padding: 10px;
            box-sizing: border-box;
            margin: 0 10px;
        }
        @keyframes slideshow {
            0%    { transform: translateX(var(--translate-start)); }
            100%  { transform: translateX(var(--translate-end)); }
          }
        .books-list ul li > div{
            width: 200px;
        }
        .book-cover {
            width: 100%;
            height: 200px;
            background: #fff;
        }
    </style>
    <div class="books-list">
        <loader-element></loader-element>
        <div class="date-stamp">Test</div>
        <ul class="items"></ul>
    </div>
    <template class="book-template">
        <li>
            <div>
                <img class="book-cover"/>
                <div class="book-info">
                    <h4 class="title"></h4>
                    <p class="author"></p>
                </div>
            </div>
        </li>
    </template>
`;