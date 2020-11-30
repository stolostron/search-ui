import {
    AcmExpandableSection,
    AcmPage,
    AcmPageCard,
    AcmPageHeader,
    AcmTable,
} from '@open-cluster-management/ui-components'
import {
    Card,
    CardBody,
    Divider,
    Flex,
    FlexItem,
    Grid,
    GridItem,
    PageSection,
    SearchInput,
} from '@patternfly/react-core'
import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'

export function SearchTemplate(props: { title: string; description: string }) {
    return (
        <Card>
            <CardBody>
                <Flex>
                    <FlexItem>
                        <Flex direction={{ default: 'column' }} alignItems={{ default: 'alignItemsCenter' }}>
                            <FlexItem>10</FlexItem>
                            <FlexItem>Results</FlexItem>
                        </Flex>
                    </FlexItem>
                    <Divider isVertical />
                    <FlexItem>
                        <Flex direction={{ default: 'column' }}>
                            <FlexItem>{props.title}</FlexItem>
                            <FlexItem>
                                <Divider />
                            </FlexItem>
                            <FlexItem>{props.description}</FlexItem>
                        </Flex>
                    </FlexItem>
                </Flex>
            </CardBody>
        </Card>
    )
}

export function SearchResult() {
    return (
        <Card>
            <CardBody>1 Result</CardBody>
        </Card>
    )
}

const searchTemplates: {
    title: string
    description: string
}[] = [
    {
        title: 'Workloads',
        description: 'A pre-defined search to help you review your workloads.',
    },
    {
        title: 'Unhealthy Pods',
        description: 'Show pods with unhealth status.',
    },
    {
        title: 'Created last hour Pods',
        description: 'Search for resources created within the last hour.',
    },
]

export function SearchPage() {
    return (
        <AcmPage>
            <AcmPageHeader title="Search" />
            <SearchData />
        </AcmPage>
    )
}

export function SearchData() {
    return <SearchContent />
}

export function SearchContent() {
    return (
        <Fragment>
            <PageSection>
                <Card>
                    <SearchInput></SearchInput>
                </Card>
            </PageSection>
            <PageSection>Suggested search templates</PageSection>
            <PageSection>
                <Grid hasGutter>
                    {searchTemplates.map((searchTemplate) => (
                        <GridItem span={4} key={searchTemplate.title}>
                            <SearchTemplate title={searchTemplate.title} description={searchTemplate.description} />
                        </GridItem>
                    ))}
                </Grid>
            </PageSection>

            <PageSection>
                <Grid hasGutter>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                    <GridItem span={2}>
                        <SearchResult />
                    </GridItem>
                </Grid>
            </PageSection>
            <AcmPageCard>
                <AcmExpandableSection label="Replicaset" expanded={true}>
                    <AcmTable
                        plural="replicasets"
                        items={[{ name: 'one' }, { name: 'two' }, { name: 'three' }]}
                        columns={[{ header: 'Name', cell: 'name' }]}
                        keyFn={() => '123'}
                        tableActions={[]}
                        rowActions={[]}
                        bulkActions={[]}
                    ></AcmTable>
                </AcmExpandableSection>
            </AcmPageCard>
        </Fragment>
    )
}
