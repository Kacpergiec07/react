import React  from "react";


const BookItem =({book, onToggleRead, onDelete, onUpdatePages}) =>{
    const{ id, tittle, pages, read} = book;

    const bookClass = read ? 'book-item read-book' : 'book-item unread-book';

    const handleUpdatePages = (change)=>{
        const newPages = Math.max(50, pages + change);
        onUpdatePages(id,newPages);
    };
    return(
        <div className="{bookClass}">
            <div className="book-info">
                <input type="checkbox" checked="{read}" onChange={()=> onToggleRead}/>
                <span className="book-title">{tittle}</span>
                <span>&nbsp;({pages}stron)</span>
            </div>
            <div className="book-item-actions">
                <button onClick={()=>handleUpdatePages(50)}>+50</button>
                <button onClick={()=>handleUpdatePages(-50)} disabled="{pages <= 50}">-50</button>
                <button onClick={()=> onDelete(id)} className="delete-btn">Usun</button>
            </div>
        </div>
    )
}
export default BookItem;
