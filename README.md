# inventory-manager

TODO:

- Fix errors:

  - Check if I can use .toLocaleString() on the validator constants rather than each instance
  - .tolocalestring breaks textarea max
  - move form focus logic to own func
  - Add more context rules or change validators -> Combine form field prompts and error prompts

- Make everything pretty:

  - Redo home page (it's arguably the most important page)
  - Max width on header content
  - Remove DRY text-decoration none statements
  - Width different when scrollbar present

- Accessability:

  - Style form field contexts and make sure they are accessible (correct tag and read by screen reader)
  - Add aria labels to all links
  - Add titles to buttons?

- Deployment:

  - Go through layout.ejs head and make sure all tags are correct and present
  - Make a secret password for production
  - Remove console.error logs e.g.console.error("Error editing category:", error); for production
  - Figure out what was meant by test and deployment DB connections Odin Project
