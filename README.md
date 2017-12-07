`A work in progress do not use`

# ViewIn.js

A simple utility to apply and remove classes to DOM elements as they enter the view port, using the Intersection Observer API.


## Usage

`viewIn('.my-selector', options);`


## Options

`classOnEnter` - css class name to add when an element enters the viewport

`classOnExit` - css class name to add when an element leaves the view port

`exitThreshold` - what % of the element is remaining in the viewport before classOnExit is applied

`enterThreshold` - what % of the element is visible in the viewport before classOnEnter is applied.

## To Do

- `once: boolean` - only trigger the observerable once
- Tidy up