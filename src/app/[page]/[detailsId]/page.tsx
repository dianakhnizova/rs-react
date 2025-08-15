import { bookService } from '@/api/services/booksService';
import { BookDetailSection } from '@/pages/main-page/components/book-detail-section/BookDetailSection';
import { IBookData } from '@/sources/interfaces';

interface Props {
  params: Promise<{ page: string; detailsId: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { detailsId } = await params;

  let bookDetails: IBookData | null = null;

  if (detailsId) {
    try {
      bookDetails = await bookService.getBookById(detailsId);
    } catch (error) {
      console.log(error);
    }
  }

  return <BookDetailSection bookDetails={bookDetails} />;
}
