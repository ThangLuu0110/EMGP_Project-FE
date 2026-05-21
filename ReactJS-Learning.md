# **REACT JS**
## Components:
- Components are the building blocks of a React application that represent a part of the user interface
    + `Re-usability`: A Component used in one area of the application can be reused in another area. This helps speed up the development process
    + `Nested`: A component can contain several other components
    + `Render method`: In its minimal form, a component must define a render method that specifies how the component renders to th DOM
    + `Passing properties`: A component can also receive prop, These are properties passed by its parent to specify values

## Types of Components:
- `Stateless Functional Components`:
    + They are JavaScript functions
    + They return HTML
    + Can be contained in a .jsx or .js file
- `Stateful Class Components`: 
    + Regular classes that extend the component class
    + They must contain a render method that returns HTML
    + Can be contained in a .js or .jsx file

## Nesting Components:
- Components have to be nested into the main component using import and export keywords
    + [Export] feature is used to export a particular module(file) and use it in another module(file)
        _`Export default` is used to export only one object(function, variable, class) from the file. There can only be one default export per file. In order to import the default export from a file, we can use only the address and use the keyword import before it.
        _`Named export` or just export can be used to export multiple objects from a file. There can be several named export from a single file. Importing named values allows the user to import multiple objects from a file. However, the names of the objects cannot be changed while importing.
    + [Import] feature is used to import a particular module(file) and use it in the existing module(file)

## Higher order & Pure components:
- Higher order components: A higher-order components is a function that takes a component and returns a new component. 
It facilitates reusing of component logic
