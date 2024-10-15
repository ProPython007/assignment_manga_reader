import { useState, useEffect } from "react";
import { baseURL } from "../constants/constants";
import useFetch from "../utils/useFetch";


// This component renders the page and keep track of pages and also handles change in prev/next chapters at edge pages through the functions accuired from parent component:
const ContentPage = (props) => {
    let contentDisplay = true;
    const chapterId = props.chapterId;
    const startingPage = props.startingPage;
    const prevChapter = props.prevChapter;
    const nextChapter = props.nextChapter;
    
    const { data: content, isPending, error } = useFetch(`${baseURL}/chapters/${chapterId}/`);
    const [currentPage, setCurrentPage] = useState(0);

    // Setting up dependency for asynchronous fetch:
    useEffect(() => {
        if (startingPage === -1){
            setCurrentPage(content.pages.length - 1);
        }
        else {
            setCurrentPage(0);
        }
    }, [content]);

    // Func for handling page previous switch:
    function prevPage() {
        let tempCurrentPage = currentPage - 1;
        if (tempCurrentPage < 0) {
            prevChapter();
        } else {
            setCurrentPage(tempCurrentPage);
            contentDisplay = true;
        }
    }

    // Func for handling page next switch:
    function nextPage() {
        let tempCurrentPage = currentPage + 1;
        if (tempCurrentPage > (content.pages.length - 1)) {
            nextChapter();
        } else {
            setCurrentPage(tempCurrentPage);
            contentDisplay = true;
        }
    }

    // Func for handling overlays for pages next/prev switch:
    const handleImageClick = (event) => {
        contentDisplay = false;
        const imgWidth = event.target.clientWidth;
        const clickX = event.nativeEvent.offsetX;
    
        if (clickX < imgWidth / 2) {
            nextPage();
        } else {
            prevPage();
        }
    };

    return (
        <div>
            <div className="pages">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {content && currentPage < content.pages.length && currentPage > -1 && contentDisplay && (
                    <img
                        className="page"
                        src={`${content.pages[currentPage].image.file}`}
                        alt="manga page"
                        onClick={handleImageClick}
                    />
                )}
            </div>
                {content && contentDisplay && (
                    <p style={{ textAlign: "center" }}>
                        {currentPage + 1}/{content.pages.length}
                    </p>
                )}
        </div>
    );
};

export default ContentPage;
