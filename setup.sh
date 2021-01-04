#!/usr/bin/env bash


######################
# configure Backend
######################
echo > ./backend/.env

API_SERVER_URL=`oc get infrastructure cluster -o jsonpath={.status.apiServerURL}`
echo API_SERVER_URL=$API_SERVER_URL >> ./backend/.env

OAUTH2_CLIENT_ID=multicloudingress
echo OAUTH2_CLIENT_ID=$OAUTH2_CLIENT_ID >> ./backend/.env

OAUTH2_CLIENT_SECRET=multicloudingresssecret
echo OAUTH2_CLIENT_SECRET=$OAUTH2_CLIENT_SECRET >> ./backend/.env

OAUTH2_REDIRECT_URL=http://localhost:4000/search/login/callback
echo OAUTH2_REDIRECT_URL=$OAUTH2_REDIRECT_URL >> ./backend/.env

NODE_TLS_REJECT_UNAUTHORIZED=0
echo NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED >> ./backend/.env

FRONTEND_URL=http://localhost:3000
echo FRONTEND_URL=$FRONTEND_URL >> ./backend/.env

REDIRECT_URIS=$(oc get OAuthClient $OAUTH2_CLIENT_ID -o json | jq -c "[.redirectURIs[], \"$OAUTH2_REDIRECT_URL\"] | unique")
oc patch OAuthClient multicloudingress --type json -p "[{\"op\": \"add\", \"path\": \"/redirectURIs\", \"value\": ${REDIRECT_URIS}}]"

# Create route to the search-api service on the target cluster.
oc create route passthrough search-api --service=search-search-api --insecure-policy=Redirect -n open-cluster-management
SEARCH_API_URL=https://$(oc get route search-api -n open-cluster-management | grep search-api | awk '{print $2}')
echo SEARCH_API_URL=$SEARCH_API_URL >> ./backend/.env

# Create route to the console-api service on the target cluster.
oc create route passthrough console-api --service=console-api --insecure-policy=Redirect -n open-cluster-management
CONSOLE_API_URL=https://$(oc get route console-api -n open-cluster-management | grep console-api | awk '{print $2}')
echo CONSOLE_API_URL=$CONSOLE_API_URL >> ./backend/.env
