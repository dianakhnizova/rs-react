import { bookService } from '@/api/services/booksService';
import { BookDetailSection } from '@/pages/main-page/components/book-detail-section/BookDetailSection';
import { IBookData } from '@/sources/interfaces';

interface Props {
  params: Promise<{ page: string; detailsId: string }>;
  searchParams: { searchTerm?: string };
}

export default async function BookDetailPage({ params, searchParams }: Props) {
  const { detailsId, page } = await params;
  const { searchTerm } = searchParams;

  let bookDetails: IBookData | null = null;

  if (detailsId) {
    try {
      bookDetails = await bookService.getBookById(detailsId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BookDetailSection
      bookDetails={bookDetails}
      currentPage={page}
      currentSearch={searchTerm}
    />
  );
}
