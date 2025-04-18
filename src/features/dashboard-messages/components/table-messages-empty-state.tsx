import {
  IllustrationAlert,
  IllustrationDone,
  IllustrationDragAndDrop,
  LinkButton,
  Loader,
} from '@stacklok/ui-kit'
import { ReactNode } from 'react'

import { emptyStateStrings } from '../../../constants/empty-state-strings'
import { EmptyState } from '@/components/empty-state'
import { hrefs } from '@/lib/hrefs'
import { LinkExternal02 } from '@untitled-ui/icons-react'
import { useListAllWorkspaces } from '@/hooks/use-query-list-all-workspaces'
import { useMessagesFilterSearchParams } from '../hooks/use-messages-filter-search-params'
import { match, P } from 'ts-pattern'
import { twMerge } from 'tailwind-merge'
import { AlertTriggerType } from '@/api/generated'
import { useQueryGetWorkspaceMessagesTable } from '../hooks/use-query-get-workspace-messages-table'

function EmptyStateLoading() {
  return (
    <EmptyState
      title={emptyStateStrings.title.loading}
      body={emptyStateStrings.body.loading}
      illustration={(props) => (
        <Loader {...props} className={twMerge(props.className, '!size-16')} />
      )}
      actions={null}
    />
  )
}

function EmptyStateGetStarted() {
  return (
    <EmptyState
      title={emptyStateStrings.title.getStarted}
      body={emptyStateStrings.body.getStartedDesc}
      illustration={IllustrationDragAndDrop}
      actions={[
        <LinkButton
          aria-label="CodeGate docs"
          key="codegate-docs"
          href={hrefs.external.docs.home}
          target="_blank"
        >
          CodeGate docs
          <LinkExternal02 />
        </LinkButton>,
      ]}
    />
  )
}

// function EmptyStateSearch({
//   search,
//   setSearch,
// }: {
//   search: string
//   setSearch: (v: string | null) => void
// }) {
//   return (
//     <EmptyState
//       illustration={IllustrationNoSearchResults}
//       title={emptyStateStrings.title.noSearchResultsFor(search)}
//       body={emptyStateStrings.body.tryChangingSearch}
//       actions={[
//         <Button key="clear-search" onPress={() => setSearch(null)}>
//           Clear search
//         </Button>,
//       ]}
//     />
//   )
// }

function EmptyStateNoMessagesInWorkspace() {
  return (
    <EmptyState
      title={emptyStateStrings.title.noMessagesWorkspace}
      body={emptyStateStrings.body.messagesWillShowUpWhenWorkspace}
      illustration={IllustrationDone}
      actions={[
        <LinkButton
          key="learn-about-workspaces"
          href={hrefs.external.docs.workspaces}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn about Workspaces
          <LinkExternal02 />
        </LinkButton>,
      ]}
    />
  )
}

function EmptyStateMalicious() {
  return (
    <EmptyState
      title={emptyStateStrings.title.noMaliciousPackagesDetected}
      body={emptyStateStrings.body.maliciousDesc}
      illustration={IllustrationDone}
      actions={null}
    />
  )
}

function EmptyStateSecrets() {
  return (
    <EmptyState
      title={emptyStateStrings.title.noLeakedSecretsDetected}
      body={emptyStateStrings.body.secretsDesc}
      illustration={IllustrationDone}
      actions={null}
    />
  )
}

function EmptyStatePII() {
  return (
    <EmptyState
      title={emptyStateStrings.title.noPIIDetected}
      body={emptyStateStrings.body.piiDesc}
      illustration={IllustrationDone}
      actions={null}
    />
  )
}

export function EmptyStateError() {
  return (
    <EmptyState
      title={emptyStateStrings.title.anErrorOccurred}
      body={emptyStateStrings.body.errorDesc}
      illustration={IllustrationAlert}
      actions={[
        <LinkButton
          key="discord"
          variant="secondary"
          href={hrefs.external.discord}
          rel="noopener noreferrer"
          target="_blank"
        >
          Discord
          <LinkExternal02 />
        </LinkButton>,
        <LinkButton
          key="github-issues"
          variant="secondary"
          href={hrefs.external.github.newIssue}
          rel="noopener noreferrer"
          target="_blank"
        >
          Github issues
          <LinkExternal02 />
        </LinkButton>,
      ]}
    />
  )
}

type MatchInput = {
  isLoading: boolean
  hasWorkspaceMessages: boolean
  hasMultipleWorkspaces: boolean
  view: AlertTriggerType | 'all'
}

export function TableMessagesEmptyState() {
  const { state } = useMessagesFilterSearchParams()

  const { data: response, isLoading: isMessagesLoading } =
    useQueryGetWorkspaceMessagesTable()

  const { data: workspaces = [], isLoading: isWorkspacesLoading } =
    useListAllWorkspaces()

  const isLoading = isMessagesLoading || isWorkspacesLoading

  const hasMultipleWorkspaces: boolean =
    workspaces.filter((w) => w.name !== 'default').length > 0

  const hasWorkspaceMessages: boolean = Boolean(response && response.total > 0)

  return match<MatchInput, ReactNode>({
    hasMultipleWorkspaces,
    hasWorkspaceMessages,
    isLoading,
    view: state.view ?? 'all',
  })
    .with(
      {
        hasMultipleWorkspaces: false,
        hasWorkspaceMessages: false,
        isLoading: false,
        view: P.any,
      },
      () => <EmptyStateGetStarted />
    )
    .with(
      {
        hasMultipleWorkspaces: true,
        hasWorkspaceMessages: false,
        isLoading: false,
        view: 'all',
      },
      () => <EmptyStateNoMessagesInWorkspace />
    )
    .with(
      {
        hasMultipleWorkspaces: P.any,
        hasWorkspaceMessages: false,
        isLoading: false,
        view: AlertTriggerType.CODEGATE_PII,
      },
      () => <EmptyStatePII />
    )
    .with(
      {
        hasMultipleWorkspaces: P.any,
        hasWorkspaceMessages: false,
        isLoading: false,
        view: AlertTriggerType.CODEGATE_CONTEXT_RETRIEVER,
      },
      () => <EmptyStateMalicious />
    )
    .with(
      {
        hasMultipleWorkspaces: P.any,
        hasWorkspaceMessages: false,
        isLoading: false,
        view: AlertTriggerType.CODEGATE_SECRETS,
      },
      () => <EmptyStateSecrets />
    )
    .otherwise(() => <EmptyStateLoading />)
}
