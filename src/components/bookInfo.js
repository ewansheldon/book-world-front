import React from "react";

const BookInfo = (props) => {
    if (props.book) {
        return (
            <div className="book-info">
                <div className="book-info--header">
                    <div className="book-info--header--title">
                        <h2>{props.book.title}</h2>
                        <h3>by {props.book.author}</h3>
                    </div>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Viles_Bodies.jpg/220px-Viles_Bodies.jpg"/>
                </div>
                <p>blah blah blah description of book......</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a augue est. Sed odio sem, dictum in
                    leo ut, gravida dictum nisl. Nullam mollis pulvinar leo, vitae lacinia massa suscipit eu. Proin est
                    magna, pulvinar vitae tortor ac, suscipit congue mauris. Proin viverra blandit est ut vulputate.
                    Nunc vel erat ex. Aliquam eget nibh in augue hendrerit rhoncus. Sed molestie neque hendrerit
                    efficitur rhoncus.</p>
                <p>Maecenas massa est, scelerisque nec quam eu, venenatis rutrum velit. Sed laoreet, lacus non lobortis
                    convallis, enim ex aliquam ante, vitae efficitur tellus metus eget augue. Integer condimentum magna
                    vel arcu consequat ultricies ac a elit. Nullam pharetra dignissim ultrices. Cras viverra aliquet
                    rhoncus. Suspendisse risus mauris, facilisis eget sodales at, facilisis vel turpis. Sed sit amet
                    arcu nunc. Nam eget vestibulum orci. In et aliquam magna. Fusce sed tellus sollicitudin,
                    pellentesque turpis eget, auctor eros. Sed eget lobortis nulla. Fusce sodales diam magna, at laoreet
                    ex consectetur a.</p>
            </div>
        )
    }

    return null;
}

export default BookInfo;
