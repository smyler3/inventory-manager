# inventory-manager

TODO:

- Fix errors:

  - Focus first invalid field on unsuccesful submit
  - Add more context rules or change validators
  - Combine form field prompts and error prompts
  - Check if I can use .toLocaleString() on the validator constants rather than each instance

- Accessability:

  - Style form field contexts and make sure they are accessible (correct tag and read by screen reader)

- Make everything pretty:

  - Style destructive buttons red
  - Re-style creation buttons?
  - Re-style edit buttons?
  - Add hover, focus, and click styles:
    - Header buttons
    - Action buttons
    - GitHub Button
    - Cards
    - Back links
  - Redo home page (it's arguably the most important page)

- Deployment:
  - Go through layout.ejs head and make sure all tags are correct and present
  - Make a secret password for production
  - Remove console.error logs e.g.console.error("Error editing category:", error); for production
  - Figure out what was meant by test and deployment DB connections Odin Project
