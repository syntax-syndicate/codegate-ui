import { Button, Card, CardBody, CardFooter, Form } from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useMutationCreateWorkspace } from "../hooks/use-mutation-create-workspace";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SchemaForm } from "@/forms";
import { Type } from "@sinclair/typebox";

export function WorkspaceName({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const navigate = useNavigate();
  const { mutateAsync, isPending, error, reset } = useMutationCreateWorkspace();
  const errorMsg = error?.detail ? `${error?.detail}` : "";

  const [data, setData] = useState(() => ({ workspaceName }));
  // NOTE: When navigating from one settings page to another, this value is not
  // updated, hence the synchronization effect
  useEffect(() => {
    setData({ workspaceName });
    reset();
  }, [reset, workspaceName]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(
      { body: { name: workspaceName, rename_to: data.workspaceName } },
      {
        onSuccess: () => navigate(`/workspace/${data.workspaceName}`),
      },
    );
  };

  const schema = Type.Object({
    workspaceName: Type.String({ title: "Workspace name" }),
  });

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        validationBehavior="aria"
        key={workspaceName}
      >
        <Card
          className={twMerge(className, "shrink-0")}
          data-testid="workspace-name"
        >
          <CardBody>
            <SchemaForm
              data={data}
              schema={schema}
              onChange={({ data }) => setData(data)}
            />
          </CardBody>
          <CardFooter className="justify-end gap-2">
            {errorMsg && <div className="p-1 text-red-700">{errorMsg}</div>}
            <Button
              isDisabled={isArchived || data.workspaceName === ""}
              isPending={isPending}
              type="submit"
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}
