// Copyright (c) 2021 Red Hat, Inc.

const getCsrfToken = () => {
    const metaTag = document!.body!.querySelector('meta[name=csrf-token]')! as HTMLMetaElement
    return metaTag?.content || ''
}

export default getCsrfToken
