import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Text,
} from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useMutationPreferredModelWorkspace } from "../hooks/use-mutation-preferred-model-workspace";
import { MuxMatcherType } from "@/api/generated";
import { FormEvent } from "react";
import { usePreferredModelWorkspace } from "../hooks/use-preferred-preferred-model";
import { Select, SelectButton } from "@stacklok/ui-kit";
import { useModelsData } from "@/hooks/use-models-data";
import { Type } from "@sinclair/typebox";
import { FormCard } from "@/forms/FormCard";

export function WorkspacePreferredModel({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const { preferredModel, setPreferredModel } =
    usePreferredModelWorkspace(workspaceName);
  const { mutateAsync } = useMutationPreferredModelWorkspace();
  const { data: providerModels = [], isPending } = useModelsData();
  const { model, provider_id } = preferredModel;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutateAsync({
      path: { workspace_name: workspaceName },
      body: [
        {
          matcher: "",
          provider_id,
          model,
          matcher_type: MuxMatcherType.CATCH_ALL,
        },
      ],
    });
  };

  const modelOptions = (isPending ? [] : providerModels).map(
    (model) => `${model.provider_name}/${model.name}`,
  );

  console.log("modelOptions", modelOptions);

  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      model: {
        title: "Model",
        type: "string",
        ...(modelOptions.length > 0
          ? {
              enum: modelOptions,
            }
          : {}),
      },
    },
    required: ["model"],
  };

  return (
    <FormCard className={className} schema={schema} isPending={isPending} />
  );
}
