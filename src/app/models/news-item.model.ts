import Utils from '@shared/utils';

export class NewsItem {
    id: string;
    title: string;
    link: URL | null;
    synopsis: string;

    constructor(title: string, link: string, synopsis: string = '') {
        this.id = Utils.generateId();
        this.title = title;
        this.link = Utils.getUrlFromString(link);
        this.synopsis = synopsis?.trim() ?? '';
    }

    // ===================================================
    // hasLink
    // ---------------------------------------------------
    // Returns: true if linkk is not null.
    // ===================================================
    hasLink() : boolean {
        return this.link != null;
    }

    // ===================================================
    // hasSynopsis
    // ---------------------------------------------------
    // Returns: true if synopsis is not empty.
    // ===================================================
    hasSynopsis() : boolean {
        return this.synopsis.length > 0;
    }
}
