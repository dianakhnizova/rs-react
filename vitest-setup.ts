import '@testing-library/jest-dom';

class MockFileList extends Array {
  item(index: number) {
    return this[index] || null;
  }
}

global.FileList = MockFileList as unknown as typeof FileList;
