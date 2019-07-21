import template from './template';
import '../loader'
import { promises } from 'fs';

export default class BooksList extends HTMLElement {
        static readonly elementTemplate = (document.createElement('template').innerHTML = template);
        static readonly is = 'books-list';
        books = Array;
        bookTemplate: HTMLTemplateElement;
        booksContainer: HTMLElement;
        booksList: HTMLElement;
        loader: HTMLElement;
        dateContainer: HTMLElement;
        constructor() {
            super();
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = BooksList.elementTemplate;
            this.bookTemplate = shadowRoot.querySelector('.book-template') as HTMLTemplateElement;
            this.booksList = shadowRoot.querySelector('.items') as HTMLElement;
            this.loader =  shadowRoot.querySelector('loader-element') as HTMLElement;
            this.booksContainer = shadowRoot.querySelector('.books-list') as HTMLElement;
            this.dateContainer = shadowRoot.querySelector('.date-stamp') as HTMLElement;
        }

        fetchTime() {
            let date = new Date();
            let lang = navigator.language;
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let localDate = date.toLocaleDateString(lang, options);
            let localTime = date.toLocaleTimeString(lang);
            this.dateContainer.innerText = `${localDate} ${localTime}`;
            this.dateContainer.style.display = 'block';
        }

        fetchBooks(data: string) {
            this.loader.style.display = 'block';
            this.dateContainer.style.display = 'none';
            this.booksList.innerHTML = '';
            let url = `http://openlibrary.org/search.json?q=${data}`;
            fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.books = data.docs;
                this.displayBooks(data.docs);
                this.fetchTime();
            });
        }
        lazyloadImages(bookCover: any) {
            const options = {
                root: this.booksContainer,
                rootMargin: '0px 600px 0px 0px'
            }
            let imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(function(entry: any) {
                  if (entry.isIntersecting) {
                    var image = entry.target;
                    image.srcset = image.dataset.src;
                    imageObserver.unobserve(image);
                  }
                });
              }, options);
              imageObserver.observe(bookCover);
        }
        addImageProcess(image: HTMLImageElement){
            return new Promise((resolve, reject) => {
                image.onload = () => resolve()
                image.onerror = reject
            })
          }
        displayBooks (books: any) {
            let root = document.documentElement;
            root.style.setProperty('--translate-end', `-${240*books.length - this.booksContainer.offsetWidth}px`);
            let preloadedImages: any = [];
            books.forEach((book: any, index: any) => {
                let bookItem = document.importNode(this.bookTemplate.content, true)
                let bookTitle = bookItem.querySelector('.title') as HTMLElement;
                let bookAuthor = bookItem.querySelector('.author') as HTMLElement;
                let bookCover = bookItem.querySelector('.book-cover') as HTMLImageElement;
                bookTitle.textContent = book.title;
                bookAuthor.textContent = book.author_name;
                if (book.isbn) {
                    if (index <= 10) {
                        bookCover.srcset = `http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg 3x, http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg 2x, http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg 1x`;
                        preloadedImages.push(this.addImageProcess(bookCover));
                    } else {
                        bookCover.dataset.src = `http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg 3x, http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg 2x, http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg 1x`;
                    }
                }
                this.booksList.appendChild(bookItem);
                if (!bookCover.srcset) {
                    this.lazyloadImages(bookCover);
                }
            });
            Promise.all(preloadedImages).then(() => {
                this.loader.style.display = 'none';
                this.booksList.style.animationDuration = `${books.length * 2}s`;
                this.booksList.classList.add('shown');
              }, (err) => {
                console.warn(err)
              });
                
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.booksList.style.animationPlayState = 'paused';
                } else {
                    this.booksList.style.animationPlayState = 'running';
                }
              });
        }
        
        connectedCallback() {
            document.addEventListener('startBooksFetching', ((event: CustomEvent) => {
                this.fetchBooks(event.detail);
            }) as EventListener);
        }
        disconnectedCallback() {
            document.removeEventListener('startBooksFetching', ((event: CustomEvent) => {
                this.fetchBooks(event.detail);
            }) as EventListener);
        }
      }
    customElements.define(BooksList.is, BooksList);

