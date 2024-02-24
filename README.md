# React Audio Voice Recorder Demo

A small demo made to demonstrate building a custom UI for the
[react-audio-voice-recorder](https://www.npmjs.com/package/react-audio-voice-recorder)
package in React.

## Getting Started

Install dependencies:

```bash
npm install
```

Hack the visualizer to import types properly (until I figure out how to avoid
needing to do this - if you don't want to do it this way, you can manually
include the package in your source code instead with the correct types.d.ts
config):

- Go to node_modules/react-audio-visualize/dist and rename "index.d.ts" to
  "react-audio-visualize.es.d.ts"

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
demo page.
