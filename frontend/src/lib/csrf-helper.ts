// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

const getCsrfToken = () => {
    const metaTag = document!.body!.querySelector('meta[name=csrf-token]')! as HTMLMetaElement
    return metaTag?.content || ''
}

export default getCsrfToken
