import { bookService } from '@/api/services/booksService';
import { BookDetailSection } from '@/pages/main-page/components/book-detail-section/BookDetailSection';
import { IBookData } from '@/sources/interfaces';
import { messages as sourceMessages } from '@/sources/messages';

interface Props {
  params: Promise<{ page: string; detailsId: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { detailsId } = await params;

  let initialBookDetails: IBookData | null = null;
  let initialErrorMessage = '';

  if (detailsId) {
    try {
      initialBookDetails = await bookService.getBookById(detailsId);
    } catch (error: unknown) {
      initialErrorMessage =
        error instanceof Error ? error.message : sourceMessages.errorMessage;
    }
  }

  return (
    <BookDetailSection
      detailsId={detailsId}
      initialBookDetails={initialBookDetails}
      initialErrorMessage={initialErrorMessage}
    />
  );
}
