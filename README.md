# Search UI

## Development

### Env vars
You will need to set the following env vars for local dev:
| REACT_APP_API_SERVER_URL    | Get this url with oc cluster-info |
| REACT_APP_SERVICEACCT_TOKEN | Get this token with oc whoami -t  |
| REACT_APP_SEARCH_API_URL    | https://localhost:4010/searchapi  |


| Script           | Description                      |
| ---------------- | -------------------------------- |
| `npm ci`         | Install dependencies             |
| `npm start`      | Start the development server     |
| `npm test`       | Run unit tests                   |
| `npm run lint`   | Run linting on source files      |
| `npm run update` | Update all project dependencies  |

