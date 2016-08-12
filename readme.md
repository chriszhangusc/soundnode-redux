Packages for tests:
npm install karma karma-chrome-launcher karma-mocha karma-mocha-reporter karma-sourcemap-loader karma-webpack mocha expect --save-dev

<Link> and <IndexLink>
The primary way to allow users to navigate around your application. <Link> will render a fully accessible anchor tag with the proper href.

A <Link> can know when the route it links to is active and automatically apply an activeClassName and/or activeStyle when given either prop. The <Link> will be active if the current route is either the linked route or any descendant of the linked route. To have the link be active only on the exact linked route, use <IndexLink> instead or set the onlyActiveOnIndex prop.
