import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Resources() {
  return (
    <>
      <Helmet>
        <title>Documentation | RymeHelper</title>
        <meta name="description" content="Official documentation for RymeHelper." />
      </Helmet>
      
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Documentation' }]} />

        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-4 mt-6">
          RymeHelper <span className="text-primary">Documentation</span>
        </h1>
        <p className="text-muted-foreground font-sans text-lg mb-12">
          Welcome to the official documentation for RymeHelper, the ultimate songwriting text editor and rhyming dictionary. 
          This document provides a comprehensive overview of the application's architecture, features, and usage.
        </p>

        <div className="prose prose-invert max-w-none font-sans text-muted-foreground space-y-6">
          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">Introduction</h2>
          <p>
            RymeHelper is a dedicated desktop application built with React, Vite, and Electron, designed specifically for songwriters, poets, and vocalists. It bridges the gap between a distraction-free writing environment and a powerful linguistic analysis tool, allowing creators to find perfect rhymes, count syllables, and manage multiple projects simultaneously without ever breaking their creative flow.
          </p>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">Core Editor Features</h2>
          <p>
            At the heart of RymeHelper is a robust, rich-text editor powered by Tiptap/ProseMirror. It includes standard formatting tools as well as custom extensions tailored for songwriting.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Rich Text Formatting:</strong> Standard support for bold, italic, underline, strikethrough, highlighting, and text alignment.</li>
            <li><strong>Syllable Counter:</strong> Automatically calculates and displays syllable counts for lines, helping you maintain consistent rhythm and meter.</li>
            <li><strong>Auto-Rhyme Highlighter:</strong> Intelligently highlights words at the end of lines that rhyme, giving you a visual representation of your rhyme scheme.</li>
            <li><strong>Line Manipulation:</strong> Dedicated tools for shifting, rearranging, and formatting stanzas and verses efficiently.</li>
            <li><strong>Auto-Scroll:</strong> A built-in teleprompter feature that smoothly scrolls your lyrics during recording or practice sessions. The speed can be adjusted via the footer interface.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">Rhyming & Dictionary Tools</h2>
          <p>
            RymeHelper integrates seamlessly with linguistic databases (via the Datamuse API) to provide instant lyrical inspiration directly within the editor.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Instant Word Selection:</strong> Highlight any word in the editor to open the contextual Rhyme Popup.</li>
            <li><strong>Exact Rhymes:</strong> Find words that perfectly rhyme with your selection.</li>
            <li><strong>Near Rhymes (Slant Rhymes):</strong> Discover words with similar vowel or consonant sounds to expand your creative options when exact rhymes feel too restrictive.</li>
            <li><strong>Multisyllabic Rhyming (Pro Feature):</strong> Search for complex, multi-word phrases that rhyme with entire bars or stanzas.</li>
            <li><strong>Synonyms & Sounds Like:</strong> Broaden your vocabulary by finding synonyms or words that have a phonetic resemblance to your target word.</li>
            <li><strong>Side Panel Dictionary:</strong> A dedicated, persistent side panel that allows you to search the dictionary without losing your place in the editor.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">Project Management</h2>
          <p>
            Managing multiple songs, verses, and ideas is streamlined through the Project Sidebar and Tab System.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Local File System Integration:</strong> Projects can be saved directly to your hard drive (e.g., .txt or .md files) using modern File System Access APIs.</li>
            <li><strong>Auto-Save:</strong> Any changes made in the editor are automatically debounced and saved locally to prevent data loss.</li>
            <li><strong>Tabbed Interface:</strong> Open multiple songs at once using the top tab bar.</li>
            <li><strong>Split-Screen View:</strong> Compare two songs, verses, or reference tracks side-by-side. You can easily drag and drop tabs between the left and right panels.</li>
            <li><strong>Project Sidebar:</strong> A centralized hub to create new songs, switch between recent projects, or permanently delete old drafts.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">Workspace Modes</h2>
          <p>
            RymeHelper adapts to the different phases of the songwriting process through specialized workspace modes.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Focus Mode:</strong> Activated via F11 or the menu bar. This mode strips away all sidebars, menus, and distractions, leaving only the text editor and a dark background for deep, uninterrupted writing.</li>
            <li><strong>Studio Mode:</strong> Designed for the recording booth. It exposes the built-in Audio Player, allowing you to load beats or reference tracks and play them directly within the app while writing or recording.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">Account & Licensing</h2>
          <p>
            RymeHelper offers both a robust free version and a premium "Pro" tier for serious artists.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Authentication:</strong> Secure user accounts managed via Supabase. Users can sign up and log in via email.</li>
            <li><strong>Password Recovery:</strong> Built-in password reset flows accessible directly from the login screen.</li>
            <li><strong>Pro Features (Studio Pass):</strong> Advanced features, such as Multisyllabic Rhyme searching, are unlocked via a license key. License keys are securely validated and managed through LemonSqueezy integration.</li>
            <li><strong>Offline Capabilities:</strong> The app requires an internet connection for dictionary queries and initial login, but the core writing and file-saving functionalities are fully supported offline.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">Security & Resilience</h2>
          <p>
            RymeHelper is built with modern desktop security practices to ensure your data and system remain safe.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Context Isolation:</strong> The Electron wrapper uses strict context isolation and disables Node integration in the renderer process to prevent malicious code execution.</li>
            <li><strong>XSS Protection:</strong> All loaded project content is heavily sanitized using DOMPurify before rendering.</li>
            <li><strong>API Rate Limiting:</strong> Built-in LRU (Least Recently Used) memory caching prevents duplicate queries to external dictionary APIs, ensuring fast responses and preventing rate limits.</li>
            <li><strong>Graceful Error Handling:</strong> Comprehensive React Error Boundaries and file-system fallbacks ensure that unexpected errors do not crash the application or result in lost lyrics.</li>
          </ul>
        </div>
        
        {/* Support CTA */}
        <div className="mt-16 bg-primary/10 border border-primary/20 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-display uppercase tracking-wide mb-4">Need More Help?</h2>
          <p className="text-muted-foreground font-sans mb-6 max-w-lg mx-auto">
            Can't find what you're looking for? Our support team is here to help you get the most out of RymeHelper.
          </p>
          <a href="mailto:support@rhymehelper.store" className="inline-block px-6 py-3 bg-primary text-white font-mono rounded-md hover:bg-primary/90 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </>
  );
}
