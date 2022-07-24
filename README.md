# Async Employee Manager

This method takes advantage of the built-in `utils` package and uses its `utils.promisify` method in order to make the `mysql2` `db.query` method a promise, so that you are free to use the much more readable `async` and `await` syntax.
