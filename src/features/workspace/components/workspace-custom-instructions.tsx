import Editor, { type Theme } from '@monaco-editor/react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  DarkModeContext,
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogModal,
  DialogModalOverlay,
  DialogTitle,
  DialogTrigger,
  FieldGroup,
  Form,
  Input,
  Link,
  Loader,
  SearchField,
  SearchFieldClearButton,
  Text,
  TextLink,
} from '@stacklok/ui-kit'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { twMerge } from 'tailwind-merge'
import {
  V1GetWorkspaceCustomInstructionsData,
  V1GetWorkspaceCustomInstructionsResponse,
  V1SetWorkspaceCustomInstructionsData,
} from '@/api/generated'

import {
  QueryCacheNotifyEvent,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query'
import { v1GetWorkspaceCustomInstructionsQueryKey } from '@/api/generated/@tanstack/react-query.gen'
import { useQueryGetWorkspaceCustomInstructions } from '../hooks/use-query-get-workspace-custom-instructions'
import { useMutationSetWorkspaceCustomInstructions } from '../hooks/use-mutation-set-workspace-custom-instructions'
import Fuse from 'fuse.js'
import systemPrompts from '../constants/built-in-system-prompts.json'
import { MessageTextSquare02, SearchMd } from '@untitled-ui/icons-react'
import { invalidateQueries } from '@/lib/react-query-utils'
import { useFormState } from '@/hooks/useFormState'
import { FormButtons } from '@/components/FormButtons'

type DarkModeContextValue = {
  preference: 'dark' | 'light' | null
  override: 'dark' | 'light' | null
}

function inferDarkMode(
  contextValue:
    | null
    | [DarkModeContextValue, Dispatch<SetStateAction<DarkModeContextValue>>]
): Theme {
  if (contextValue === null) return 'light'

  // Handle override
  if (contextValue[0].override === 'dark') return 'vs-dark'
  if (contextValue[0].override === 'light') return 'light'

  // Handle preference
  if (contextValue[0].preference === 'dark') return 'vs-dark'
  return 'light'
}

function EditorLoadingUI() {
  return (
    // arbitrary value to match the monaco editor height
    // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
    <div className="flex min-h-[20rem] w-full items-center justify-center">
      <Loader className="my-auto" />
    </div>
  )
}

function isGetWorkspaceCustomInstructionsQuery(
  queryKey: unknown,
  options: V1GetWorkspaceCustomInstructionsData
): boolean {
  return (
    Array.isArray(queryKey) &&
    queryKey[0]._id ===
      v1GetWorkspaceCustomInstructionsQueryKey(options)[0]?._id
  )
}

function getCustomInstructionsFromEvent(
  event: QueryCacheNotifyEvent
): string | null {
  if ('action' in event === false || 'data' in event.action === false)
    return null
  return (
    (
      event.action.data as
        | V1GetWorkspaceCustomInstructionsResponse
        | undefined
        | null
    )?.prompt ?? null
  )
}

function useCustomInstructionsValue({
  initialValue,
  options,
  queryClient,
}: {
  initialValue: string
  options: V1GetWorkspaceCustomInstructionsData
  queryClient: QueryClient
}) {
  const initialFormValues = useMemo(
    () => ({ prompt: initialValue }),
    [initialValue],
  );
  const formState = useFormState(initialFormValues);
  const { values, setInitialValues } = formState;

  // Subscribe to changes in the workspace system prompt value in the query cache
  useEffect(() => {
    const queryCache = queryClient.getQueryCache()
    const unsubscribe = queryCache.subscribe((event) => {
      if (
        event.type === 'updated' &&
        event.action.type === 'success' &&
        isGetWorkspaceCustomInstructionsQuery(
          event.query.options.queryKey,
          options
        )
      ) {
        const prompt: string | null = getCustomInstructionsFromEvent(event)
        if (prompt === values.prompt || prompt === null) return

        setInitialValues({ prompt });
      }
    })

    return () => {
      return unsubscribe();
    };
  }, [options, queryClient, setInitialValues, values.prompt]);

  return { ...formState }
}

type PromptPresetPickerProps = {
  onActivate: (text: string) => void
}

function PromptPresetPicker({ onActivate }: PromptPresetPickerProps) {
  const [query, setQuery] = useState<string>('')

  const fuse = new Fuse(systemPrompts, {
    keys: ['name', 'text'],
  })

  const handleActivate = useCallback(
    (prompt: string) => {
      onActivate(prompt)
    },
    [onActivate]
  )

  return (
    <>
      <DialogHeader>
        <DialogTitle>Choose a prompt template</DialogTitle>
        <DialogCloseButton />
      </DialogHeader>
      <DialogContent className="relative p-0">
        <div
          className="sticky top-0 z-10 mb-2 bg-base px-4 pb-2 pt-4"
          style={{
            boxShadow: '0px 4px 4px 4px var(--bg-base)',
          }}
        >
          <SearchField className="w-full" value={query} onChange={setQuery}>
            <FieldGroup>
              <Input
                isBorderless
                icon={<SearchMd />}
                placeholder="Type to search"
                autoFocus
              />
              {query.length > 0 ? <SearchFieldClearButton /> : null}
            </FieldGroup>
          </SearchField>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4 pb-4 lg:grid-cols-2 xl:grid-cols-3">
          {fuse.search(query.length > 0 ? query : ' ').map(({ item }) => {
            return (
              <Card className="min-h-96">
                <h2 className="flex items-center gap-2 p-2 font-bold">
                  <MessageTextSquare02 className="size-4" />
                  <div className="truncate">{item.name}</div>
                </h2>
                <pre className="h-72 overflow-hidden overflow-y-auto text-wrap bg-gray-50 p-2 text-sm">
                  {item.text}
                </pre>
                <div className="flex justify-between gap-4 p-2">
                  <div className="h-full items-center">
                    <div className="flex h-full max-w-52 items-center text-clip">
                      {item.readme ? (
                        <Link target="_blank" href={item.readme}>
                          README.md
                        </Link>
                      ) : (
                        item.commiters.map((contributor) => (
                          <Link
                            className="flex h-full items-center gap-1 rounded-md px-2 text-sm font-bold text-secondary
                              no-underline hover:bg-gray-200"
                            target="_blank"
                            href={`https://github.com/${contributor}/`}
                          >
                            <img
                              className="size-6 rounded-full"
                              src={`https://github.com/${contributor}.png?size=24`}
                            />
                            <span className="truncate">{contributor}</span>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                  <Button
                    slot="close"
                    variant="secondary"
                    onPress={() => {
                      handleActivate(item.text)
                    }}
                  >
                    Use prompt
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </DialogContent>
      <DialogFooter>
        <span className="ml-auto">
          Prompt templates sourced from{' '}
          <TextLink
            className="text-primary"
            href="https://github.com/PatrickJS/awesome-cursorrules"
          >
            PatrickJS/awesome-cursorrules
          </TextLink>
        </span>
      </DialogFooter>
    </>
  )
}

export function WorkspaceCustomInstructions({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string
  workspaceName: string
  isArchived: boolean | undefined
}) {
  const context = useContext(DarkModeContext)
  const theme: Theme = inferDarkMode(context)

  const options: V1GetWorkspaceCustomInstructionsData &
    Omit<V1SetWorkspaceCustomInstructionsData, 'body'> = useMemo(
    () => ({
      path: { workspace_name: workspaceName },
    }),
    [workspaceName]
  )

  const queryClient = useQueryClient()

  const {
    data: customInstructionsResponse,
    isPending: isCustomInstructionsPending,
  } = useQueryGetWorkspaceCustomInstructions(options)
  const { mutateAsync, isPending: isMutationPending } =
    useMutationSetWorkspaceCustomInstructions(options)

  const formState = useCustomInstructionsValue({
    initialValue: customInstructionsResponse?.prompt ?? '',
    options,
    queryClient,
  })

  const { values, updateFormValues } = formState

  const handleSubmit = useCallback(
    (value: string) => {
      mutateAsync(
        { ...options, body: { prompt: value } },
        {
          onSuccess: () => {
            formState.setInitialValues({ prompt: values.prompt });
            invalidateQueries(queryClient, [
              v1GetWorkspaceCustomInstructionsQueryKey,
            ]);
          },
        },
      );
    },
    [formState, mutateAsync, options, queryClient, values.prompt],
  );

  return (
    <Form
      onSubmit={(e: FormEvent) => {
        e.preventDefault()
        handleSubmit(values.prompt)
      }}
      validationBehavior="aria"
    >
      <Card className={twMerge(className, 'shrink-0')}>
        <CardBody>
          <Text className="text-primary">Custom instructions</Text>
          <Text className="mb-4 text-secondary">
            Pass custom instructions to your LLM to augment its behavior, and
            save time & tokens.
          </Text>
          <div className="overflow-hidden rounded border border-gray-200">
            {isCustomInstructionsPending ? (
              <EditorLoadingUI />
            ) : (
              <Editor
                options={{
                  minimap: { enabled: false },
                  wordWrap: 'on',
                  readOnly: isArchived,
                }}
                value={values.prompt}
                onChange={(v) => updateFormValues({ prompt: v ?? '' })}
                height="20rem"
                defaultLanguage="Markdown"
                theme={theme}
                className={twMerge('bg-base', isArchived ? 'opacity-25' : '')}
              />
            )}
          </div>
        </CardBody>
        <CardFooter className="justify-end gap-2">
          <FormButtons
            isPending={isMutationPending}
            formState={formState}
            canSubmit={
              !isArchived && !isCustomInstructionsPending && !isMutationPending
            }
          >
            <DialogTrigger>
              <Button variant="secondary">Use a preset</Button>
              <DialogModalOverlay isDismissable>
                <DialogModal isDismissable>
                  <Dialog
                    width="lg"
                    className="min-h-[44rem]"
                    style={{ maxWidth: 'min(calc(100vw - 64px), 1200px)' }}
                  >
                    <PromptPresetPicker
                      onActivate={(prompt: string) => {
                        updateFormValues({ prompt })
                      }}
                    />
                  </Dialog>
                </DialogModal>
              </DialogModalOverlay>
            </DialogTrigger>
          </FormButtons>
        </CardFooter>
      </Card>
    </Form>
  )
}
