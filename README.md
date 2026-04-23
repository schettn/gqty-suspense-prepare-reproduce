# GQty Suspense Prepare Reproduction

This repository reproduces an infinite loop issue when using GQty's `useQuery` with `suspense: true` and the `prepare` helper, specifically when an error is thrown by the GraphQL server.

## The Issue

When `useQuery` is used with `suspense: true` and a `prepare` function:

1. If the server returns a GraphQL error, the expectation is that the nearest `ErrorBoundary` should catch it.
2. In practice, the component enters an infinite rendering loop instead of being caught by the `ErrorBoundary`.

### Related Issues

- [React Issue #17526: Infinite loop when error is thrown in Suspense](https://github.com/facebook/react/issues/17526)
- [GQty useQuery.ts source](https://github.com/gqty-dev/gqty/blob/9440f90a22868ba1eb05ae1e844c273cdd5e5a63/packages/react/src/query/useQuery.ts#L293)

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/)

### Installation

```bash
pnpm install
```

### Running the Reproduction

Start both the GraphQL Yoga server and the Vite dev server concurrently:

```bash
pnpm dev
```

The servers will be available at:

- **Frontend**: http://localhost:5173
- **GraphQL API**: http://localhost:4000/graphql

## Reproduction Steps

1. Open the browser at http://localhost:5173.
2. Open the **Browser Console**.
3. Click the **"Increase Counter"** button repeatedly until the counter reaches **3**.
4. The server is configured to throw an error specifically for input `"3"`.
5. **Observe the Loop**:
   - Instead of showing the Error Boundary dashboard, the console will continuously log:
     - `%c Rendering Page, counter: blue ... 3`
     - `%c [prepare] calling mirror with input: green ... 3`
   - The component is stuck in an infinite retry loop.
