export function getPaginationPages(currentPage: number, lastPage: number): number[] {
    const visiblePages = 5;

    if (lastPage <= visiblePages) {
        return Array.from({ length: lastPage }, (_, index) => index + 1);
    }

    let startPage = currentPage - Math.floor(visiblePages / 2);
    let endPage = currentPage + Math.floor(visiblePages / 2);

    if (startPage < 1) {
        startPage = 1;
        endPage = visiblePages;
    }

    if (endPage > lastPage) {
        endPage = lastPage;
        startPage = lastPage - visiblePages + 1;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
}
