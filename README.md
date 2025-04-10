# inventory-manager

TODO:

- make everything pretty

  - Add favicon

- Style form field contexts and make sure they are accessible (correct tag and read by screen reader)

- Fix errors:

  - Focus first invalid field on unsuccesful submit
  - Add more context rules or change validators
  - Combine form field prompts and error prompts
  - Check if I can use .toLocaleString() on the validator constants rather than each instance

- Deployment:
  - Make a secret password for production
  - Remove console.error logs e.g.console.error("Error editing category:", error); for production
  - Figure out what was meant by test and deployment DB connections Odin Project
