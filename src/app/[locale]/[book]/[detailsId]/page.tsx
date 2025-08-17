import { bookService } from '@/app/api/books/services/booksService';
import { BookDetailSection } from '@/pages/main-page/components/book-detail-section/BookDetailSection';
import { IBookData } from '@/sources/interfaces';
import { messages } from '@/sources/messages';

interface Props {
  params: Promise<{ detailsId: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { detailsId } = await params;

  let initialBookDetails: IBookData | null = null;
  let initialError: string | null = null;

  if (detailsId) {
    try {
      initialBookDetails = await bookService.getBookById(detailsId);
    } catch (error: unknown) {
      initialError =
        error instanceof Error ? error.message : messages.errorDetailsMessage;
    }
  }

  return (
    <BookDetailSection
      initialBookDetails={initialBookDetails}
      initialError={initialError}
    />
  );
}
