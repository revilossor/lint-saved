# Lint Saved

This package will watch files in a node project, and run commands against files when they are saved.

Install it with ```npm i lint-saved -g```, then run it next to your package.json with ```lint-saved```.

It'll use the config from lint-staged, and run the appropriate commands against changed files.

## Development

You can link the library in the global npm cache ( for this version of npm ) with ```npm link```, then run ```lint-saved``` in a directory with a package.json.

__NOTE__ please ensure you enable the git hooks by running ```npm run setup-git-hooks```!

### Continuous Integration

The CI actions can be tested with [act](https://github.com/nektos/act) like this

```bash
act -j test
```
