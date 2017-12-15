# ViewIn.js

ViewIn(tersector) is a simple utility to apply and remove classes to DOM elements as they enter the view port, using the Intersection Observer API.

## Usage

`viewIn('.my-selector', options);`

## Options

| Option         | Type   | Default      | Description                                     |
| :------------- | :----- | :----------- | :---------------------------------------------- |
| classOnEnter   | string | inview-enter | Class added when element is visible             |
| classOnExit    | string | inview-exit  | Class added was visible but then exits viewport |
| exitThreshold  | number | 0.75         | % of element visible to trigger exit            |
| enterThreshold | number | 0.75         | % of element visible to trigger enter           |

## To Do

* Add Interes feature detection
* Allow a callback to be passed for exit and enter
* Make options ... optional
* Error cases
* `once: boolean` - only trigger the observerable once
