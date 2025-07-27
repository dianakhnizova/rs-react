const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';
const OPEN_LIBRARY_WORK_URL = 'https://openlibrary.org/works';
const OPEN_LIBRARY_COVER_URL = 'https://covers.openlibrary.org/b/id';
const getAuthorUrl = (key: string) => `https://openlibrary.org${key}.json`;

const RS_SCHOOL_URL = 'https://rs.school/courses/reactjs';
const ITEMS_PER_PAGE = 5;

export {
  OPEN_LIBRARY_SEARCH_URL,
  OPEN_LIBRARY_WORK_URL,
  OPEN_LIBRARY_COVER_URL,
  getAuthorUrl,
  RS_SCHOOL_URL,
  ITEMS_PER_PAGE,
};
