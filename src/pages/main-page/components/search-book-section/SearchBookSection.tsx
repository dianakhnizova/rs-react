import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { selectSearchTerm } from '@/store/slices/search/selectors';
import { useActions } from '@/utils/hooks/useActions';
import { SearchBar } from './search-bar/SearchBar';
import { messages } from './messages';
import { useSearchQuery } from '@/utils/hooks/useSearchQuery';

export const SearchBookSection = () => {
  const searchTerm = useAppSelector(selectSearchTerm);
  const { searchInput, setSearchInput } = useSearchQuery(searchTerm);
  const { setSearchTerm, setCurrentPage } = useActions();

  const handleSubmitBookSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  return (
    <SearchBar
      setSearchInput={setSearchInput}
      handleSubmit={handleSubmitBookSearch}
      inputProps={{
        type: 'text',
        placeholder: messages.inputPlaceholder,
        value: searchInput,
      }}
    />
  );
};
