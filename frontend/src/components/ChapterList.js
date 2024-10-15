import { useState, useEffect } from "react";
import ContentPage from "./ContentPage"


// This component renders the chapter buttons and then pass the selected chapter as a prop to ContentPage component:
const ChapterList = (props) => {    
    const book = props.book;
    const [currentChapter, setCurrentChapter] = useState(book.chapter_ids[0]);
    const [startingPage, setStartingPage] = useState(0);

    useEffect(() => {
        setCurrentChapter(book.chapter_ids[0]);
        setStartingPage(0);
    }, [book]);

    // Func for checking if selected:
    function isChapterSelected(id) {
        if (currentChapter === id){
            return true;
        }
        return false;
    }

    // Func for handling chapter previous switch:
    function prevChapter() {
        let currentChapterIdx = book.chapter_ids.findIndex((id) => id === currentChapter);
        currentChapterIdx = (currentChapterIdx - 1);
        if (currentChapterIdx < 0){
            currentChapterIdx = book.chapter_ids.length - 1;
        }
        setCurrentChapter(book.chapter_ids[currentChapterIdx]);
        setStartingPage(-1);
    }

    // Func for handling chapter next switch:
    function nextChapter() {
        let currentChapterIdx = book.chapter_ids.findIndex((id) => id === currentChapter);
        currentChapterIdx = (currentChapterIdx + 1) % book.chapter_ids.length;
        setCurrentChapter(book.chapter_ids[currentChapterIdx]);
        setStartingPage(0);
    }

    return (
        <div>
            <div className="chapters">
            {book.chapter_ids.map((chapter, i) => (
                    <button 
                        className={
                            isChapterSelected(chapter) ? "chapter currentChapter" : "chapter"
                        }
                        onClick={() => {
                            setCurrentChapter(chapter);
                            setStartingPage(0);
                        }}
                        key={i}>
                            {chapter}
                    </button>
                ))}
            </div>
            <br />
            {currentChapter && <ContentPage chapterId={currentChapter} prevChapter={prevChapter} nextChapter={nextChapter} startingPage={startingPage} />}
        </div>
     );
}
 
export default ChapterList;