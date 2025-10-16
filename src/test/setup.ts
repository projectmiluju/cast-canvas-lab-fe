import "@testing-library/jest-dom";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class DOMMatrixMock {
  a = 1;
  b = 0;
  c = 0;
  d = 1;
  e = 0;
  f = 0;
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock);
vi.stubGlobal("DOMMatrix", DOMMatrixMock);
