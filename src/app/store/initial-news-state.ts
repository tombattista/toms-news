import { NewsItem } from "@models/news-item.model";
import { NewsState } from "./news-state.type";
import { SearchItem } from "@models/search-item.model";

export const initialNewsState: NewsState = {
    searchQueue: [] /*[
        new SearchItem("One two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen", [ 
            new NewsItem("Google", "https://www.google.com"),
            new NewsItem("Angular Material Icons", "https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/#angular-material-icons-list-categories"),
            new NewsItem("LinkedIn - Tom Battista", "https://www.linkedin.com/in/tom-battista-6bb56716/"),
            new NewsItem("Sensation News Item 5", "https://www.yahoo.com"),
            new NewsItem("LinkedIn Feed", "https://www.linkedin.com/feed/?highlightedUpdateType=SHARED_BY_YOUR_NETWORK&highlightedUpdateUrn=urn%3Ali%3Aactivity%3A7288966182869602304"),
            new NewsItem("Microsoft Network", "https://www.msn.com"),
            new NewsItem("NVidia - Video Encode and Decode", "https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new"),
            new NewsItem("Michigan Tech News - Quantum Teleportation Achieved Over Internet", "https://mitechnews.com/science/quantum-teleportation-achieved-over-internet/"),
            new NewsItem("Nextech", "https://www.nextech.com/"),
            new NewsItem("Nextech AI Solutions", "https://www.nextech.com/solutions/ai"),
            new NewsItem("Nextech on Glassdoor", "https://www.glassdoor.com/Reviews/Nextech-Systems-Reviews-E557514.htm"),
            new NewsItem("Nextech Bing Search", "https://www.bing.com/search?pglt=425&q=nextech+systems+company+reviews&cvid=8dcfbed2738a493080c62434d03afe2c&gs_lcrp=EgRlZGdlKgcIABAAGPkHMgcIABAAGPkHMgYIARAAGEAyBggCEEUYOTIGCAMQABhAMgYIBBAAGEAyBggFEAAYQDIGCAYQABhAMgYIBxBFGD0yBggIEEUYPdIBCDE2ODhqMGoxqAIAsAIA&FORM=ANNTA1&PC=U531")
        ]),
        new SearchItem("One two three four five six seven", [ 
            new NewsItem("Google", "https://www.google.com"),
            new NewsItem("Angular Material Icons", "https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/#angular-material-icons-list-categories"),
            new NewsItem("LinkedIn - Tom Battista", "https://www.linkedin.com/in/tom-battista-6bb56716/"),
            new NewsItem("Sensation News Item 5", "https://www.yahoo.com"),
            new NewsItem("LinkedIn Feed", "https://www.linkedin.com/feed/?highlightedUpdateType=SHARED_BY_YOUR_NETWORK&highlightedUpdateUrn=urn%3Ali%3Aactivity%3A7288966182869602304"),
            new NewsItem("Microsoft Network", "https://www.msn.com"),
            new NewsItem("Nextech Bing Search", "https://www.bing.com/search?pglt=425&q=nextech+systems+company+reviews&cvid=8dcfbed2738a493080c62434d03afe2c&gs_lcrp=EgRlZGdlKgcIABAAGPkHMgcIABAAGPkHMgYIARAAGEAyBggCEEUYOTIGCAMQABhAMgYIBBAAGEAyBggFEAAYQDIGCAYQABhAMgYIBxBFGD0yBggIEEUYPdIBCDE2ODhqMGoxqAIAsAIA&FORM=ANNTA1&PC=U531")
        ])
    ]*/,
    stories: [],
    currentQuery: '',
    searchHistory: []
}