# next-starting-point

A project template using next.js, react, material-ui, jest, eslint, storybook, prettier.

## Packages / Scripts
* most scripts are setup to run using `yarn`

## UI / Styling
* Uses `material-ui` (along with @material-ui/styles, their included css-in-js solution)
* Note, `styled-jsx`, also comes default with Next.js
* Also, the `notistack` package is included for simple user feedback
  * https://iamhosseindhv.com/notistack

## Setup
### Folder Structure

The folder structure is based on Next.js convention. The project root has folders for source code and assets in `pages`, `public`, `src`.

### Source Code Folders (within `src`)
* `components`
  * `common` - components used by multiple other components (if one 'common' component imports another 'common' component, import it directly, not using the alias to avoid circular import eslint error)
  * `views` - components for creating a page view (typically used in `pages`)
* `utils` - utility functions
* `helpers` - ui / component related helper functions

#### Component Code File Structure
* A component can either be in a self named file, such as `ComponentName.js`, or in a older folder with an index file (typically when the component consists of multiple files).
* `index.js` files typically only contain import / export statements. The exception is when `index.js` files are needed in the `pages` folder.

### Import Aliases
* Import aliases have been created for `common`, `helpers`, `utils`, `views`
* Files / settings to adjust when adding an import alias.
  * `jest-config.json`: moduleNameMapper
  * `.eslintrc.json`: no-underscore-dangle, import/resolver
  * `next.config.js`

#### Configured for next.js, eslint, storybook, jest
* `_common` points to `src/components/common`
* `_helpers` points to `src/helpers`
* `_utils` points to `src/utils`
* `_views` points to `src/components/views`

### Environment Variables
* none by default, but the `dotenv` package is included for dev .env support

## Testing
### Configuration / Setup
#### Jest Unit Tests
* Jest unit test configuration is in `.jest-config.json`
* All test files are located in `__tests__/` subdirectories, and named `*.test.js`

##### React Testing Library
* React Testing Library (RTL) is used in conjunction with Jest for UI unit and some level of integration testing
  * In some cases it is helpful to use a `data-testid` to find an element for testing. When doing so, follow this naming convention: component-name-elementType  (e.g. addUser-create-button).
  * React Testing Library extended expect matchers, `@testing-library/jest-dom/extend-expect`, are imported via `jest-config.json`

## Storybook
* Uses the version 5.2+ 'Component Story Format'
  * https://storybook.js.org/docs/basics/writing-stories/
  * https://storybook.js.org/docs/formats/component-story-format/
