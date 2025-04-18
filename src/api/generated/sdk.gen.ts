// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type OptionsLegacyParser,
} from '@hey-api/client-fetch'
import type {
  HealthCheckHealthGetError,
  HealthCheckHealthGetResponse,
  V1ListProviderEndpointsData,
  V1ListProviderEndpointsError,
  V1ListProviderEndpointsResponse,
  V1AddProviderEndpointData,
  V1AddProviderEndpointError,
  V1AddProviderEndpointResponse,
  V1ListAllModelsForAllProvidersError,
  V1ListAllModelsForAllProvidersResponse,
  V1ListModelsByProviderData,
  V1ListModelsByProviderError,
  V1ListModelsByProviderResponse,
  V1GetProviderEndpointData,
  V1GetProviderEndpointError,
  V1GetProviderEndpointResponse,
  V1UpdateProviderEndpointData,
  V1UpdateProviderEndpointError,
  V1UpdateProviderEndpointResponse,
  V1DeleteProviderEndpointData,
  V1DeleteProviderEndpointError,
  V1DeleteProviderEndpointResponse,
  V1ConfigureAuthMaterialData,
  V1ConfigureAuthMaterialError,
  V1ConfigureAuthMaterialResponse,
  V1ListWorkspacesError,
  V1ListWorkspacesResponse,
  V1CreateWorkspaceData,
  V1CreateWorkspaceError,
  V1CreateWorkspaceResponse,
  V1ListActiveWorkspacesError,
  V1ListActiveWorkspacesResponse,
  V1ActivateWorkspaceData,
  V1ActivateWorkspaceError,
  V1ActivateWorkspaceResponse,
  V1UpdateWorkspaceData,
  V1UpdateWorkspaceError,
  V1UpdateWorkspaceResponse,
  V1DeleteWorkspaceData,
  V1DeleteWorkspaceError,
  V1DeleteWorkspaceResponse,
  V1ListArchivedWorkspacesError,
  V1ListArchivedWorkspacesResponse,
  V1RecoverWorkspaceData,
  V1RecoverWorkspaceError,
  V1RecoverWorkspaceResponse,
  V1HardDeleteWorkspaceData,
  V1HardDeleteWorkspaceError,
  V1HardDeleteWorkspaceResponse,
  V1GetWorkspaceAlertsData,
  V1GetWorkspaceAlertsError,
  V1GetWorkspaceAlertsResponse,
  V1GetWorkspaceAlertsSummaryData,
  V1GetWorkspaceAlertsSummaryError,
  V1GetWorkspaceAlertsSummaryResponse,
  V1GetWorkspaceMessagesData,
  V1GetWorkspaceMessagesError,
  V1GetWorkspaceMessagesResponse,
  V1GetMessagesByPromptIdData,
  V1GetMessagesByPromptIdError,
  V1GetMessagesByPromptIdResponse,
  V1GetWorkspaceCustomInstructionsData,
  V1GetWorkspaceCustomInstructionsError,
  V1GetWorkspaceCustomInstructionsResponse,
  V1SetWorkspaceCustomInstructionsData,
  V1SetWorkspaceCustomInstructionsError,
  V1SetWorkspaceCustomInstructionsResponse,
  V1DeleteWorkspaceCustomInstructionsData,
  V1DeleteWorkspaceCustomInstructionsError,
  V1DeleteWorkspaceCustomInstructionsResponse,
  V1GetWorkspaceMuxesData,
  V1GetWorkspaceMuxesError,
  V1GetWorkspaceMuxesResponse,
  V1SetWorkspaceMuxesData,
  V1SetWorkspaceMuxesError,
  V1SetWorkspaceMuxesResponse,
  V1ListWorkspacesByProviderData,
  V1ListWorkspacesByProviderError,
  V1ListWorkspacesByProviderResponse,
  V1StreamSseError,
  V1StreamSseResponse,
  V1VersionCheckError,
  V1VersionCheckResponse,
  V1GetWorkspaceTokenUsageData,
  V1GetWorkspaceTokenUsageError,
  V1GetWorkspaceTokenUsageResponse,
  V1ListPersonasError,
  V1ListPersonasResponse,
  V1CreatePersonaData,
  V1CreatePersonaError,
  V1CreatePersonaResponse,
  V1GetPersonaData,
  V1GetPersonaError,
  V1GetPersonaResponse,
  V1UpdatePersonaData,
  V1UpdatePersonaError,
  V1UpdatePersonaResponse,
  V1DeletePersonaData,
  V1DeletePersonaError,
  V1DeletePersonaResponse,
} from './types.gen'

export const client = createClient(createConfig())

/**
 * Health Check
 */
export const healthCheckHealthGet = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    HealthCheckHealthGetResponse,
    HealthCheckHealthGetError,
    ThrowOnError
  >({
    ...options,
    url: '/health',
  })
}

/**
 * List Provider Endpoints
 * List all provider endpoints.
 */
export const v1ListProviderEndpoints = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<V1ListProviderEndpointsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1ListProviderEndpointsResponse,
    V1ListProviderEndpointsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/provider-endpoints',
  })
}

/**
 * Add Provider Endpoint
 * Add a provider endpoint.
 */
export const v1AddProviderEndpoint = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1AddProviderEndpointData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    V1AddProviderEndpointResponse,
    V1AddProviderEndpointError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/provider-endpoints',
  })
}

/**
 * List All Models For All Providers
 * List all models for all providers.
 */
export const v1ListAllModelsForAllProviders = <
  ThrowOnError extends boolean = false,
>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1ListAllModelsForAllProvidersResponse,
    V1ListAllModelsForAllProvidersError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/provider-endpoints/models',
  })
}

/**
 * List Models By Provider
 * List models by provider.
 */
export const v1ListModelsByProvider = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1ListModelsByProviderData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1ListModelsByProviderResponse,
    V1ListModelsByProviderError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/provider-endpoints/{provider_id}/models',
  })
}

/**
 * Get Provider Endpoint
 * Get a provider endpoint by ID.
 */
export const v1GetProviderEndpoint = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1GetProviderEndpointData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1GetProviderEndpointResponse,
    V1GetProviderEndpointError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/provider-endpoints/{provider_id}',
  })
}

/**
 * Update Provider Endpoint
 * Update a provider endpoint by ID.
 */
export const v1UpdateProviderEndpoint = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1UpdateProviderEndpointData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    V1UpdateProviderEndpointResponse,
    V1UpdateProviderEndpointError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/provider-endpoints/{provider_id}',
  })
}

/**
 * Delete Provider Endpoint
 * Delete a provider endpoint by id.
 */
export const v1DeleteProviderEndpoint = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1DeleteProviderEndpointData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    V1DeleteProviderEndpointResponse,
    V1DeleteProviderEndpointError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/provider-endpoints/{provider_id}',
  })
}

/**
 * Configure Auth Material
 * Configure auth material for a provider.
 */
export const v1ConfigureAuthMaterial = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1ConfigureAuthMaterialData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    V1ConfigureAuthMaterialResponse,
    V1ConfigureAuthMaterialError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/provider-endpoints/{provider_id}/auth-material',
  })
}

/**
 * List Workspaces
 * List all workspaces.
 */
export const v1ListWorkspaces = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1ListWorkspacesResponse,
    V1ListWorkspacesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces',
  })
}

/**
 * Create Workspace
 * Create a new workspace.
 */
export const v1CreateWorkspace = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1CreateWorkspaceData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    V1CreateWorkspaceResponse,
    V1CreateWorkspaceError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces',
  })
}

/**
 * List Active Workspaces
 * List all active workspaces.
 *
 * In it's current form, this function will only return one workspace. That is,
 * the globally active workspace.
 */
export const v1ListActiveWorkspaces = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1ListActiveWorkspacesResponse,
    V1ListActiveWorkspacesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/active',
  })
}

/**
 * Activate Workspace
 * Activate a workspace by name.
 */
export const v1ActivateWorkspace = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1ActivateWorkspaceData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    V1ActivateWorkspaceResponse,
    V1ActivateWorkspaceError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/active',
  })
}

/**
 * Update Workspace
 * Update a workspace.
 */
export const v1UpdateWorkspace = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1UpdateWorkspaceData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    V1UpdateWorkspaceResponse,
    V1UpdateWorkspaceError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}',
  })
}

/**
 * Delete Workspace
 * Delete a workspace by name.
 */
export const v1DeleteWorkspace = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1DeleteWorkspaceData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    V1DeleteWorkspaceResponse,
    V1DeleteWorkspaceError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}',
  })
}

/**
 * List Archived Workspaces
 * List all archived workspaces.
 */
export const v1ListArchivedWorkspaces = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1ListArchivedWorkspacesResponse,
    V1ListArchivedWorkspacesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/archive',
  })
}

/**
 * Recover Workspace
 * Recover an archived workspace by name.
 */
export const v1RecoverWorkspace = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1RecoverWorkspaceData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    V1RecoverWorkspaceResponse,
    V1RecoverWorkspaceError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/archive/{workspace_name}/recover',
  })
}

/**
 * Hard Delete Workspace
 * Hard delete an archived workspace by name.
 */
export const v1HardDeleteWorkspace = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1HardDeleteWorkspaceData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    V1HardDeleteWorkspaceResponse,
    V1HardDeleteWorkspaceError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/archive/{workspace_name}',
  })
}

/**
 * Get Workspace Alerts
 * Get alerts for a workspace.
 */
export const v1GetWorkspaceAlerts = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1GetWorkspaceAlertsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1GetWorkspaceAlertsResponse,
    V1GetWorkspaceAlertsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/alerts',
  })
}

/**
 * Get Workspace Alerts Summary
 * Get alert summary for a workspace.
 */
export const v1GetWorkspaceAlertsSummary = <
  ThrowOnError extends boolean = false,
>(
  options: OptionsLegacyParser<V1GetWorkspaceAlertsSummaryData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1GetWorkspaceAlertsSummaryResponse,
    V1GetWorkspaceAlertsSummaryError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/alerts-summary',
  })
}

/**
 * Get Workspace Messages
 * Get messages for a workspace.
 */
export const v1GetWorkspaceMessages = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1GetWorkspaceMessagesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1GetWorkspaceMessagesResponse,
    V1GetWorkspaceMessagesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/messages',
  })
}

/**
 * Get Messages By Prompt Id
 * Get messages for a workspace.
 */
export const v1GetMessagesByPromptId = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1GetMessagesByPromptIdData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1GetMessagesByPromptIdResponse,
    V1GetMessagesByPromptIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/messages/{prompt_id}',
  })
}

/**
 * Get Workspace Custom Instructions
 * Get the custom instructions of a workspace.
 */
export const v1GetWorkspaceCustomInstructions = <
  ThrowOnError extends boolean = false,
>(
  options: OptionsLegacyParser<
    V1GetWorkspaceCustomInstructionsData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).get<
    V1GetWorkspaceCustomInstructionsResponse,
    V1GetWorkspaceCustomInstructionsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/custom-instructions',
  })
}

/**
 * Set Workspace Custom Instructions
 */
export const v1SetWorkspaceCustomInstructions = <
  ThrowOnError extends boolean = false,
>(
  options: OptionsLegacyParser<
    V1SetWorkspaceCustomInstructionsData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).put<
    V1SetWorkspaceCustomInstructionsResponse,
    V1SetWorkspaceCustomInstructionsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/custom-instructions',
  })
}

/**
 * Delete Workspace Custom Instructions
 */
export const v1DeleteWorkspaceCustomInstructions = <
  ThrowOnError extends boolean = false,
>(
  options: OptionsLegacyParser<
    V1DeleteWorkspaceCustomInstructionsData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).delete<
    V1DeleteWorkspaceCustomInstructionsResponse,
    V1DeleteWorkspaceCustomInstructionsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/custom-instructions',
  })
}

/**
 * Get Workspace Muxes
 * Get the mux rules of a workspace.
 *
 * The list is ordered in order of priority. That is, the first rule in the list
 * has the highest priority.
 */
export const v1GetWorkspaceMuxes = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1GetWorkspaceMuxesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1GetWorkspaceMuxesResponse,
    V1GetWorkspaceMuxesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/muxes',
  })
}

/**
 * Set Workspace Muxes
 * Set the mux rules of a workspace.
 */
export const v1SetWorkspaceMuxes = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1SetWorkspaceMuxesData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    V1SetWorkspaceMuxesResponse,
    V1SetWorkspaceMuxesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/muxes',
  })
}

/**
 * List Workspaces By Provider
 * List workspaces by provider ID.
 */
export const v1ListWorkspacesByProvider = <
  ThrowOnError extends boolean = false,
>(
  options: OptionsLegacyParser<V1ListWorkspacesByProviderData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1ListWorkspacesByProviderResponse,
    V1ListWorkspacesByProviderError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{provider_id}',
  })
}

/**
 * Stream Sse
 * Send alerts event
 */
export const v1StreamSse = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1StreamSseResponse,
    V1StreamSseError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/alerts_notification',
  })
}

/**
 * Version Check
 */
export const v1VersionCheck = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1VersionCheckResponse,
    V1VersionCheckError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/version',
  })
}

/**
 * Get Workspace Token Usage
 * Get the token usage of a workspace.
 */
export const v1GetWorkspaceTokenUsage = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1GetWorkspaceTokenUsageData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1GetWorkspaceTokenUsageResponse,
    V1GetWorkspaceTokenUsageError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/workspaces/{workspace_name}/token-usage',
  })
}

/**
 * List Personas
 * List all personas.
 */
export const v1ListPersonas = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1ListPersonasResponse,
    V1ListPersonasError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/personas',
  })
}

/**
 * Create Persona
 * Create a new persona.
 */
export const v1CreatePersona = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1CreatePersonaData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    V1CreatePersonaResponse,
    V1CreatePersonaError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/personas',
  })
}

/**
 * Get Persona
 * Get a persona by name.
 */
export const v1GetPersona = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1GetPersonaData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    V1GetPersonaResponse,
    V1GetPersonaError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/personas/{persona_name}',
  })
}

/**
 * Update Persona
 * Update an existing persona.
 */
export const v1UpdatePersona = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1UpdatePersonaData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    V1UpdatePersonaResponse,
    V1UpdatePersonaError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/personas/{persona_name}',
  })
}

/**
 * Delete Persona
 * Delete a persona.
 */
export const v1DeletePersona = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<V1DeletePersonaData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    V1DeletePersonaResponse,
    V1DeletePersonaError,
    ThrowOnError
  >({
    ...options,
    url: '/api/v1/personas/{persona_name}',
  })
}
