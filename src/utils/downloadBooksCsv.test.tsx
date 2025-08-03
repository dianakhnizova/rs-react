import { downloadBooksCsv } from './downloadBooksCsv';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IBookData } from '@/sources/interfaces';
import { RefObject } from 'react';

describe('downloadBooksCsv', () => {
  const mockBook: IBookData = {
    id: '1',
    title: 'Example Book',
    image: 'http://example.com/image.jpg',
    bookDetails: {
      description: 'Some description',
      authors: 'Author Name',
      year: '2023',
      pages: '300',
    },
  };

  const mockUrl = 'blob:http://localhost/fake-url';

  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => mockUrl),
      revokeObjectURL: vi.fn(),
    });
  });

  it('Should generate CSV and trigger download if link is valid', () => {
    const click = vi.fn();

    const mockLink = {
      current: {
        click,
        href: '',
        download: '',
      } as unknown as HTMLAnchorElement,
    } as RefObject<HTMLAnchorElement | null>;

    downloadBooksCsv([mockBook], mockLink);

    expect(mockLink.current!.href).toBe(mockUrl);
    expect(mockLink.current!.download).toBe('1_items.csv');
    expect(click).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(mockUrl);
  });

  it('Should not do anything if books list is empty', () => {
    const click = vi.fn();

    const mockLink = {
      current: {
        click,
        href: '',
        download: '',
      } as unknown as HTMLAnchorElement,
    } as RefObject<HTMLAnchorElement | null>;

    downloadBooksCsv([], mockLink);

    expect(click).not.toHaveBeenCalled();
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('Should not crash if link is null', () => {
    const mockLink = {
      current: null,
    };

    expect(() => downloadBooksCsv([mockBook], mockLink)).not.toThrow();
  });

  describe('downloadBooksCsv - content edge cases', () => {
    const mockUrl = 'blob:http://localhost/fake-url';
    let blobSpy: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      blobSpy = vi.fn();
      vi.stubGlobal('Blob', blobSpy as unknown as typeof Blob);
      vi.stubGlobal('URL', {
        createObjectURL: vi.fn(() => mockUrl),
        revokeObjectURL: vi.fn(),
      });
    });

    it('Should properly format empty or undefined fields in CSV', () => {
      const mockBook: IBookData = {
        id: '1',
        title: 'Test Book',
        image: '',
        bookDetails: {
          description: '',
          authors: '',
          year: null as unknown as string,
          pages: undefined,
        },
      };

      const click = vi.fn();
      const mockLink = {
        current: {
          click,
          href: '',
          download: '',
        } as unknown as HTMLAnchorElement,
      } as RefObject<HTMLAnchorElement | null>;

      downloadBooksCsv([mockBook], mockLink);

      const expectedCsv = [
        'Title,Description,Image,Author,Year,Pages',
        `"Test Book","","","","",""`,
      ].join('\n');

      expect(blobSpy).toHaveBeenCalledWith([expectedCsv], {
        type: 'text/csv;charset=utf-8;',
      });
    });
  });
});
