# Node.js

## Course Overview

JavaScript's story used to end at the browser. Front-end code lived inside the tab, while back-end logic required PHP, Ruby, Java, or another language entirely — forcing developers to juggle multiple runtimes and ecosystems. Then in **2009, Ryan Dahl** released Node.js: a way to break JavaScript free from the browser and run it anywhere.

Today there are more fullstack options than ever, yet Node.js remains one of the most powerful and versatile choices. It lets you build fast, scalable applications in a single language — from streaming services to real-time apps, microservices, automation tools, bots, scrapers, desktop apps, and even Internet of Things devices.

And thanks to **NPM**, Node gives you access to millions of open-source packages to build faster, smarter, and more efficiently.

**Instructor:** Tom Chant  
**Course Projects:** Wild Horizons API, Paranormal Encounters App

---

## Why Learn Node.js Before a Framework?

The obvious question: *Express.js exists — why not just learn that?*

When you understand how Node.js works at its core, you become a more versatile developer. Frameworks become easier to learn because you already know what they're abstracting. Express isn't the only Node framework either — there's Nest.js, Fastify, and more. Knowing plain Node means you can move between them.

Think of it like this: learning jQuery without knowing JavaScript first. You can get things done, but you won't understand *why* — and you'll be stuck whenever the framework doesn't do exactly what you need.

---

## What Node.js Actually Is

Node.js is **not a language**. Everything written in this course is plain JavaScript. Node is a **runtime environment** — a place to run JavaScript outside the browser.

Browsers can run JavaScript because they ship with a JavaScript engine (Chrome uses **V8**). Node.js bundles that same V8 engine, which is what makes server-side JavaScript possible.

That means two things:

1. Your existing JavaScript knowledge transfers directly.
2. There are new concepts specific to the Node environment — file system access, HTTP modules, streams, and more — that don't exist in the browser.

---

## Course Requirements

This course assumes an **intermediate JavaScript foundation**. Specifically:

- Comfortable with the main array methods: `map`, `reduce`, `filter`
- Have made a `fetch` request and worked with `async/await`
- No back-end or Node.js experience required
- No framework knowledge required — all front-end code in this course is vanilla JavaScript, HTML, and CSS

---

## Curriculum

### Part 1 — Welcome to Node.js

Introduction to the Node runtime: how V8 enables server-side JavaScript, how Node differs from browser JavaScript, and a tour of the NPM ecosystem.

### Part 2 — Build a Node API: Wild Horizons

Build a REST API serving data about some of the strangest and most intriguing travel destinations on the planet. Core Node.js HTTP module, routing, and JSON responses — no framework.

### Part 3 — Build a Fullstack Node App: Paranormal Encounters

Users can upload their encounters with the paranormal. The app serves front-end files and handles all processing on the back end — a complete fullstack Node application.

---

## Projects

### 🌍 Wild Horizons API

A REST API built with core Node.js (no Express). Serves a dataset of unusual travel destinations with endpoints for listing, filtering, and retrieving individual destinations.

**Key concepts:**

- Node's built-in `http` module
- Routing requests manually
- Parsing query strings and URL parameters
- Sending JSON responses
- Reading data from the file system

---

### 👻 Paranormal Encounters App

A fullstack application where users can submit and browse paranormal encounter reports. Node.js handles both static file serving and back-end data processing.

**Key concepts:**

- Serving HTML, CSS, and JS files from Node
- Handling form submissions on the back end
- Reading and writing data
- Combining a front-end and back-end in a single Node project

---

## Additional Resources

- [Node.js Official Docs](https://nodejs.org/en/docs/)
- [Node.js — The Complete Guide (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework)
- [NPM Documentation](https://docs.npmjs.com/)
- [Node.js Best Practices (GitHub)](https://github.com/goldbergyoni/nodebestpractices)

---

## Course Completion Checklist

- [ ] Understand why Node.js runs JavaScript outside the browser (V8 engine)
- [ ] Can distinguish between browser JS and Node.js environments
- [ ] Know how to use NPM to install and manage packages
- [ ] Built the Wild Horizons REST API without a framework
- [ ] Can manually route HTTP requests in Node
- [ ] Built a fullstack app that serves front-end files from Node
- [ ] Comfortable with Node's file system (`fs`) module
- [ ] Ready to move on to Express.js

---

## Next Steps

After completing this module:

- **Course 12** — Databases: SQL, data modelling, and persistence
- **Course 13** — Express.js: the most popular Node framework, making everything here much faster to write
- Eventually: React, Next.js, and full production-ready fullstack apps

---

Started: May 2026 — Instructor: Tom Chant
