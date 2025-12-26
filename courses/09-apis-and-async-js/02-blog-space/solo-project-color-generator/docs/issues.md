
# Issues

- The nav edits failed. Instead of one error, I got six errors that I couldn't decipher.

    The errors I received were:

  - 1x Certain ARIA roles must contain particular children: Element has children which are not allowed: ul[tabindex]
  - 5x Certain ARIA roles must be contained by particular parents: Required ARIA parent role not present: tablist

    Either fix the errors or use Option 2: Move Select Outside Navigation:

    ```html
    <nav>
        <!-- My navigation links -->
    </nav>

    <div class="filters">
        <label for="filter-select">Filter options:</label>
        <select id="filter-select" aria-label="Filter content">
            <!-- My options -->
        </select>
    </div>
    ```

- The tab selector in mobile view isn't displayed at all.
