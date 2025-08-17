import { bookService } from '@/app/api/books/services/booksService';
import { BookDetailSection } from '@/pages/main-page/components/book-detail-section/BookDetailSection';
import { IBookData } from '@/sources/interfaces';

interface Props {
  params: Promise<{ detailsId: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { detailsId } = await params;

  let initialBookDetails: IBookData | null = null;

  if (detailsId) {
    initialBookDetails = await bookService.getBookById(detailsId);
  }

  return <BookDetailSection initialBookDetails={initialBookDetails} />;
}
