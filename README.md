Front-End (React/Redux) Practical Exam

Overview

The exam is designed to test your ability to cope with the new technologies and ability to learn and integrate with external frameworks.  There is no algorithmic complexity or computation challenge. It is completely trivial in this respect.

While the correctness of the implementation, the lack of bugs and the overall look and feel of the external result is of the highest importance, the elegancy of the code, usage of the correct language idioms and patterns and the coding conventions and practices applied will also play a major factor when evaluating the solution. It should behave well both externally and internally.

Development Environment

You can use the IDE of your liking to develop this part of the solution.

React

It is expected that you base your design on Redux.

Use babel and webpack to support es2015 style jsx syntax and module loading.

You can use one of those starter kits for creating a development environment:

- [https://github.com/coryhouse/react-slingshot](https://github.com/coryhouse/react-slingshot)
- [https://github.com/facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app)

Sample Application Description

The sample application is called myLocations and it allows the user to maintain a list of categorized name locations.

The domain model contains two main entities, a Category and a Location. A Category has a single property: Name. A Location has the following properties: Name, Address, Coordinates, and Category.

All data is saved to the locale storage of the browser (an HTML5 feature) for simplicity.

The application should use the react-router module.

Use Cases

The user can manage (view, add, remove and edit) the list of Categories.

The user can manage (view, add, remove and edit) the list of Locations.

The user must fill all properties when saving an item.

The user must choose a category from a list of existing categories when defining a Location.

Each screen has a top toolbar with title and action buttons. The user executes an operation on a list item by clicking the appropriate button in the top toolbar.

The application screen has a bottom bar with two iconic buttons: Categories and Locations. The user moves between Categories and Location management by clicking on their respective icons on the bottom button bar.

The user can view all Locations sorted by alphabetical order, grouped or ungrouped by category.

When the user clicks on a location, the device will vibrate (via native bridge support).

**Bonus**

- Add tests
- The user can view only the locations assigned to a specific chosen category.
- When clicking a location in the list, the user can choose to see the definition of the item or view it on an actual map (using google maps or similar service).
- Allow relating multiple categories to a single item, define and enhance the use cases and ui related to this.

Good Luck