import '@testing-library/jest-dom';

// Mock GSAP
const mockGsap = {
  registerPlugin: jest.fn(),
  context: jest.fn((callback) => {
    callback();
    return {
      revert: jest.fn(),
    };
  }),
  set: jest.fn(),
  to: jest.fn(),
  from: jest.fn(),
  fromTo: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
  })),
};

// Mock ScrollTrigger
const mockScrollTrigger = {
  create: jest.fn(),
  refresh: jest.fn(),
  update: jest.fn(),
  getAll: jest.fn(() => []),
  getById: jest.fn(),
};

jest.mock('gsap', () => ({
  __esModule: true,
  default: mockGsap,
}));

jest.mock('gsap/ScrollTrigger', () => ({
  __esModule: true,
  ScrollTrigger: mockScrollTrigger,
}));

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
