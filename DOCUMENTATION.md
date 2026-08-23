# RymeHelper Documentation

Welcome to the official documentation for RymeHelper, the ultimate songwriting text editor and rhyming dictionary. This document provides a comprehensive overview of the application's architecture, features, and usage, designed to help users and developers understand how to maximize their workflow within the app.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Core Editor Features](#core-editor-features)
3. [Rhyming & Dictionary Tools](#rhyming--dictionary-tools)
4. [Project Management](#project-management)
5. [Workspace Modes](#workspace-modes)
6. [Account & Licensing](#account--licensing)
7. [Security & Resilience](#security--resilience)

---

## Introduction

RymeHelper is a dedicated desktop application built with React, Vite, and Electron, designed specifically for songwriters, poets, and vocalists. It bridges the gap between a distraction-free writing environment and a powerful linguistic analysis tool, allowing creators to find perfect rhymes, count syllables, and manage multiple projects simultaneously without ever breaking their creative flow.

---

## Core Editor Features

At the heart of RymeHelper is a robust, rich-text editor powered by Tiptap/ProseMirror. It includes standard formatting tools as well as custom extensions tailored for songwriting.

- **Rich Text Formatting:** Standard support for bold, italic, underline, strikethrough, highlighting, and text alignment.
- **Syllable Counter:** Automatically calculates and displays syllable counts for lines, helping you maintain consistent rhythm and meter.
- **Auto-Rhyme Highlighter:** Intelligently highlights words at the end of lines that rhyme, giving you a visual representation of your rhyme scheme.
- **Line Manipulation:** Dedicated tools for shifting, rearranging, and formatting stanzas and verses efficiently.
- **Auto-Scroll:** A built-in teleprompter feature that smoothly scrolls your lyrics during recording or practice sessions. The speed can be adjusted via the footer interface.

---

## Rhyming & Dictionary Tools

RymeHelper integrates seamlessly with linguistic databases (via the Datamuse API) to provide instant lyrical inspiration directly within the editor.

- **Instant Word Selection:** Highlight any word in the editor to open the contextual Rhyme Popup.
- **Exact Rhymes:** Find words that perfectly rhyme with your selection.
- **Near Rhymes (Slant Rhymes):** Discover words with similar vowel or consonant sounds to expand your creative options when exact rhymes feel too restrictive.
- **Multisyllabic Rhyming (Pro Feature):** Search for complex, multi-word phrases that rhyme with entire bars or stanzas.
- **Synonyms & Sounds Like:** Broaden your vocabulary by finding synonyms or words that have a phonetic resemblance to your target word.
- **Side Panel Dictionary:** A dedicated, persistent side panel that allows you to search the dictionary without losing your place in the editor.

---

## Project Management

Managing multiple songs, verses, and ideas is streamlined through the Project Sidebar and Tab System.

- **Local File System Integration:** Projects can be saved directly to your hard drive (e.g., `.txt` or `.md` files) using modern File System Access APIs.
- **Auto-Save:** Any changes made in the editor are automatically debounced and saved locally to prevent data loss.
- **Tabbed Interface:** Open multiple songs at once using the top tab bar.
- **Split-Screen View:** Compare two songs, verses, or reference tracks side-by-side. You can easily drag and drop tabs between the left and right panels.
- **Project Sidebar:** A centralized hub to create new songs, switch between recent projects, or permanently delete old drafts.

---

## Workspace Modes

RymeHelper adapts to the different phases of the songwriting process through specialized workspace modes.

- **Focus Mode:** Activated via `F11` or the menu bar. This mode strips away all sidebars, menus, and distractions, leaving only the text editor and a dark background for deep, uninterrupted writing.
- **Studio Mode:** Designed for the recording booth. It exposes the built-in Audio Player, allowing you to load beats or reference tracks and play them directly within the app while writing or recording.

---

## Account & Licensing

RymeHelper offers both a robust free version and a premium "Pro" tier for serious artists.

- **Authentication:** Secure user accounts managed via Supabase. Users can sign up and log in via email.
- **Password Recovery:** Built-in password reset flows accessible directly from the login screen.
- **Pro Features (Studio Pass):** Advanced features, such as Multisyllabic Rhyme searching, are unlocked via a license key. License keys are securely validated and managed through LemonSqueezy integration.
- **Offline Capabilities:** The app requires an internet connection for dictionary queries and initial login, but the core writing and file-saving functionalities are fully supported offline.

---

## Security & Resilience

RymeHelper is built with modern desktop security practices to ensure your data and system remain safe.

- **Context Isolation:** The Electron wrapper uses strict context isolation and disables Node integration in the renderer process to prevent malicious code execution.
- **XSS Protection:** All loaded project content is heavily sanitized using DOMPurify before rendering.
- **API Rate Limiting:** Built-in LRU (Least Recently Used) memory caching prevents duplicate queries to external dictionary APIs, ensuring fast responses and preventing rate limits.
- **Graceful Error Handling:** Comprehensive React Error Boundaries and file-system fallbacks ensure that unexpected errors do not crash the application or result in lost lyrics.

---

*End of Documentation*
