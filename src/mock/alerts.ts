import { Alert } from "@/types";

export const MOCKED_ALERTS: Alert[] = [
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              '\n\n```sh local_development_env_vars.sh (13-34)\nexport KEYCLOAK_URL=http://localhost:8080/\nexport TRUSTY_KC_ADMIN_USER=service-account-trusty-server\nexport KC_TRUSTY_SERVER_SECRET=secret\nexport TRUSRY_KC_CLIENT_ID=trusty-server\n\n# Staging keycloak settings\n# export KEYCLOAK_URL=http://localhost:9080\n# export TRUSTY_KC_ADMIN_USER=service-account-trusty-server\n# export KC_TRUSTY_SERVER_SECRET="secret"\n# export TRUSRY_KC_CLIENT_ID=trusty-server\n```\nDo you see any secrets in this file?',
            timestamp: "2024-12-04T11:01:48.693044Z",
            message_id: "442715bb-28e0-40b6-83cf-dd6e1ffa6e92",
          },
          answer: {
            message:
              "Yes, this file contains sensitive data. The `KC_TRUSTY_SERVER_SECRET` variable holds a secret value. Avoid hardcoding secrets in configuration files.",
            timestamp: "2024-12-04T11:01:54.436473Z",
            message_id: "a4016d6c-5114-47c8-8b0f-daf02b235f2a",
          },
        },
      ],
      provider: "vllm",
      type: "chat",
      chat_id: "chatcmpl-d25bf6ea6ca04c7eb3a95d849511e0ff",
      conversation_timestamp: "2024-12-04T11:01:48.693044Z",
    },
    alert_id: "442715bb-28e0-40b6-83cf-dd6e1ffa6e92",
    code_snippet: {
      language: "sh",
      filepath: "local_development_env_vars.sh",
      code: `export KEYCLOAK_URL=http://localhost:8080/
  export TRUSTY_KC_ADMIN_USER=service-account-trusty-server
  export KC_TRUSTY_SERVER_SECRET=secret
  export TRUSRY_KC_CLIENT_ID=trusty-server
  
  # Staging keycloak settings
  # export KEYCLOAK_URL=http://localhost:9080
  # export TRUSTY_KC_ADMIN_USER=service-account-trusty-server
  # export KC_TRUSTY_SERVER_SECRET="secret"
  # export TRUSRY_KC_CLIENT_ID=trusty-server`,
    },
    trigger_string: "KC_TRUSTY_SERVER_SECRET=secret",
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2024-12-04T11:01:48.693044Z",
  },
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              "\n\n```yaml config.yaml (5-15)\ndatabase:\n  host: db.example.com\n  user: admin\n  password: SuperSecretPassword123\n```\nIs this configuration secure?",
            timestamp: "2024-12-04T12:30:00.000000Z",
            message_id: "31e4a10f-d6c2-42c7-a847-2fa2b76f63c9",
          },
          answer: {
            message:
              "The configuration file contains plaintext credentials (`password: SuperSecretPassword123`). Secure sensitive values using a secret management tool.",
            timestamp: "2024-12-04T12:30:10.000000Z",
            message_id: "f6b93c81-72c8-4c5b-a79e-f123bc246a12",
          },
        },
      ],
      provider: "vllm",
      type: "chat",
      chat_id: "chatcmpl-d278bf6ea6ca04c7eb3a95d849511e0ff",
      conversation_timestamp: "2024-12-04T12:30:00.000000Z",
    },
    alert_id: "31e4a10f-d6c2-42c7-a847-2fa2b76f63c9",
    code_snippet: {
      language: "yaml",
      filepath: "config.yaml",
      code: `database:
    host: db.example.com
    user: admin
    password: SuperSecretPassword123`,
    },
    trigger_string: "password: SuperSecretPassword123",
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2024-12-04T12:30:00.000000Z",
  },
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              '\n\n```py db_config.py (10-20)\nDB_HOST = "db.example.com"\nDB_USER = "admin"\nDB_PASSWORD = "UltraSecurePassword!"\n```\nIs this Python code safe for production?',
            timestamp: "2024-12-04T15:30:00.000000Z",
            message_id: "e6a5b3ef-d4a2-4e67-839c-6db3b1234f67",
          },
          answer: {
            message:
              "The Python code contains hardcoded credentials (`DB_PASSWORD`). Use environment variables or a secret manager to avoid exposing secrets.",
            timestamp: "2024-12-04T15:30:10.000000Z",
            message_id: "d9b6c4e7-1b92-4d8a-a1f2-6e34f57a1c48",
          },
        },
      ],
      provider: "openai",
      type: "chat",
      chat_id: "chatcmpl-d345cf6ea6ca04c7eb3a95d849511e0ff",
      conversation_timestamp: "2024-12-04T15:30:00.000000Z",
    },
    alert_id: "e6a5b3ef-d4a2-4e67-839c-6db3b1234f67",
    code_snippet: {
      language: "python",
      filepath: "db_config.py",
      code: `DB_HOST = "db.example.com"
  DB_USER = "admin"
  DB_PASSWORD = "UltraSecurePassword!"`,
    },
    trigger_string: "DB_PASSWORD",
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2024-12-04T15:30:00.000000Z",
  },
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              "\n\n```sh deploy.sh (2-15)\n#!/bin/bash\naws s3 cp ./file.txt s3://my-bucket --access-key AWS_ACCESS_KEY_ID=AKIAEXAMPLE --secret-key AWS_SECRET_ACCESS_KEY=SecretKey123\n```\nDo you see any secrets in this shell script?",
            timestamp: "2024-12-04T16:45:00.000000Z",
            message_id: "23b4d8ce-6719-42a8-8d8c-f9cfa3e27dc2",
          },
          answer: {
            message:
              "Yes, the shell script contains sensitive AWS credentials (`AWS_SECRET_ACCESS_KEY`). Never hardcode credentials in scripts. Use IAM roles or environment variables instead.",
            timestamp: "2024-12-04T16:45:10.000000Z",
            message_id: "83a3b0cd-5e98-4fa3-b73a-1dc9f7b92834",
          },
        },
      ],
      provider: "vllm",
      type: "chat",
      chat_id: "chatcmpl-d567cf6ea6ca04c7eb3a95d849511e0ff",
      conversation_timestamp: "2024-12-04T16:45:00.000000Z",
    },
    alert_id: "23b4d8ce-6719-42a8-8d8c-f9cfa3e27dc2",
    code_snippet: {
      language: "sh",
      filepath: "deploy.sh",
      code: `#!/bin/bash
  aws s3 cp ./file.txt s3://my-bucket --access-key AWS_ACCESS_KEY_ID=AKIAEXAMPLE --secret-key AWS_SECRET_ACCESS_KEY=SecretKey123`,
    },
    trigger_string: "AWS_SECRET_ACCESS_KEY=SecretKey123",
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2024-12-04T16:45:00.000000Z",
  },
  {
    conversation: {
      question_answers: [
        {
          question: {
            message: "Is the current version of `codegate` up-to-date?",
            timestamp: "2024-12-04T13:45:00.500000Z",
            message_id: "9c5678ef-3d2a-4b2d-a021-5e76a6276a22",
          },
          answer: {
            message:
              "The `codegate` library is outdated. The current version is `1.2.0`, but the latest stable version is `1.4.3`. Please update.",
            timestamp: "2024-12-04T13:45:10.500000Z",
            message_id: "a4321bcd-d2a3-4c8a-b122-8d983f123456",
          },
        },
      ],
      provider: "vllm",
      type: "chat",
      chat_id: "chatcmpl-d234bf6ea6ca04c7eb3a95d849511e0ff",
      conversation_timestamp: "2024-12-04T13:45:00.500000Z",
    },
    alert_id: "9c5678ef-3d2a-4b2d-a021-5e76a6276a22",
    code_snippet: null,
    trigger_string: "codegate@1.2.0",
    trigger_type: "codegate-version",
    trigger_category: "critical",
    timestamp: "2024-12-04T13:45:00.500000Z",
  },
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              "Could you verify if the retrieved context matches the prompt requirements?",
            timestamp: "2024-12-04T14:05:30.000000Z",
            message_id: "5ab768de-4a5c-48e9-bef2-9f7c3d17e003",
          },
          answer: {
            message:
              "The retrieved context is incomplete. Missing details on the `user_role`.",
            timestamp: "2024-12-04T14:05:40.000000Z",
            message_id: "b0d998cd-4d0e-43e4-b122-1d879f123987",
          },
        },
      ],
      provider: "openai",
      type: "chat",
      chat_id: "chatcmpl-d278bf6ea6ca04c7eb3a95d849511e0ff",
      conversation_timestamp: "2024-12-04T14:05:30.000000Z",
    },
    alert_id: "5ab768de-4a5c-48e9-bef2-9f7c3d17e003",
    code_snippet: null,
    trigger_string: "Missing user_role",
    trigger_type: "codegate-context-retriever",
    trigger_category: "critical",
    timestamp: "2024-12-04T14:05:30.000000Z",
  },
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              '\n\n```sh secrets.sh (10-20)\nexport DB_PASSWORD="SuperSecret123"\nexport API_KEY="apiKey987654321"\n```\nDo you see any secrets in this script?',
            timestamp: "2024-12-04T11:10:00.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174000",
          },
          answer: {
            message:
              "Yes, both `DB_PASSWORD` and `API_KEY` are sensitive and should be securely stored. Avoid committing them to source control.",
            timestamp: "2024-12-04T11:10:10.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174001",
          },
        },
      ],
      provider: "vllm",
      type: "chat",
      chat_id: "chatcmpl-001",
      conversation_timestamp: "2024-12-04T11:10:00.000000Z",
    },
    alert_id: "alert-001",
    code_snippet: {
      language: "sh",
      filepath: "secrets.sh",
      code: `export DB_PASSWORD="SuperSecret123"
export API_KEY="apiKey987654321"`,
    },
    trigger_string: "DB_PASSWORD",
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2024-12-04T11:10:00.000000Z",
  },

  // 2. Code-snippet-extractor
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              '\n\n```python credentials.py (15-25)\nAPI_KEY = "apikey12345"\nSECRET_KEY = "supersecret"\n```\nAre these credentials secure?',
            timestamp: "2024-12-04T11:30:00.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174002",
          },
          answer: {
            message:
              "No, sensitive values like `API_KEY` and `SECRET_KEY` should not be hardcoded. Use secure storage.",
            timestamp: "2024-12-04T11:30:10.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174003",
          },
        },
      ],
      provider: "openai",
      type: "chat",
      chat_id: "chatcmpl-002",
      conversation_timestamp: "2024-12-04T11:30:00.000000Z",
    },
    alert_id: "alert-002",
    code_snippet: {
      language: "python",
      filepath: "credentials.py",
      code: `API_KEY = "apikey12345"
SECRET_KEY = "supersecret"`,
    },
    trigger_string: "SECRET_KEY",
    trigger_type: "code-snippet-extractor",
    trigger_category: "critical",
    timestamp: "2024-12-04T11:30:00.000000Z",
  },

  // 3. Codegate-version
  {
    conversation: {
      question_answers: [
        {
          question: {
            message: "Is the current version of `codegate` up-to-date?",
            timestamp: "2024-12-04T12:00:00.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174004",
          },
          answer: {
            message:
              "The `codegate` library is outdated. The current version is `1.2.0`, but the latest stable version is `1.4.3`. Please update.",
            timestamp: "2024-12-04T12:00:10.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174005",
          },
        },
      ],
      provider: "vllm",
      type: "chat",
      chat_id: "chatcmpl-003",
      conversation_timestamp: "2024-12-04T12:00:00.000000Z",
    },
    alert_id: "alert-003",
    code_snippet: null,
    trigger_string: "codegate@1.2.0",
    trigger_type: "codegate-version",
    trigger_category: "critical",
    timestamp: "2024-12-04T12:00:00.000000Z",
  },

  // 4. Codegate-context-retriever
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              "Could you verify if the retrieved context matches the prompt requirements?",
            timestamp: "2024-12-04T12:30:00.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174006",
          },
          answer: {
            message:
              "The retrieved context is incomplete. Missing details on the `user_role`.",
            timestamp: "2024-12-04T12:30:10.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174007",
          },
        },
      ],
      provider: "openai",
      type: "chat",
      chat_id: "chatcmpl-004",
      conversation_timestamp: "2024-12-04T12:30:00.000000Z",
    },
    alert_id: "alert-004",
    code_snippet: null,
    trigger_string: "Missing user_role",
    trigger_type: "codegate-context-retriever",
    trigger_category: "critical",
    timestamp: "2024-12-04T12:30:00.000000Z",
  },

  // 5. Codegate-secrets (Repeated)
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              "\n\n```yaml config.yaml (5-15)\ndatabase:\n  user: admin\n  password: SuperSecretPassword123\n```\nIs this configuration secure?",
            timestamp: "2024-12-04T13:00:00.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174008",
          },
          answer: {
            message:
              "The configuration file contains plaintext credentials (`password: SuperSecretPassword123`). Secure sensitive values using a secret management tool.",
            timestamp: "2024-12-04T13:00:10.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174009",
          },
        },
      ],
      provider: "vllm",
      type: "chat",
      chat_id: "chatcmpl-005",
      conversation_timestamp: "2024-12-04T13:00:00.000000Z",
    },
    alert_id: "alert-005",
    code_snippet: {
      language: "yaml",
      filepath: "config.yaml",
      code: `database:
  user: admin
  password: SuperSecretPassword123`,
    },
    trigger_string: "password: SuperSecretPassword123",
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2024-12-04T13:00:00.000000Z",
  },

  // 6. Code-snippet-extractor (Repeated)
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              '\n\n```python auth.py (20-30)\nAUTH_TOKEN = "securetoken123"\n```\nIs this value securely managed?',
            timestamp: "2024-12-04T13:30:00.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174010",
          },
          answer: {
            message:
              "No, `AUTH_TOKEN` should not be hardcoded. Use environment variables or a secret manager.",
            timestamp: "2024-12-04T13:30:10.000000Z",
            message_id: "123e4567-e89b-12d3-a456-426614174011",
          },
        },
      ],
      provider: "openai",
      type: "chat",
      chat_id: "chatcmpl-006",
      conversation_timestamp: "2024-12-04T13:30:00.000000Z",
    },
    alert_id: "alert-006",
    code_snippet: {
      language: "python",
      filepath: "auth.py",
      code: `AUTH_TOKEN = "securetoken123"`,
    },
    trigger_string: "AUTH_TOKEN",
    trigger_type: "code-snippet-extractor",
    trigger_category: "critical",
    timestamp: "2024-12-04T13:30:00.000000Z",
  },
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              "Does the system prompt expose sensitive internal details?",
            timestamp: "2024-12-04T14:00:00.000000Z",
            message_id: "prompt-001",
          },
          answer: {
            message:
              "Yes, the system prompt contains sensitive details about database credentials and internal APIs. Avoid exposing this information.",
            timestamp: "2024-12-04T14:00:10.000000Z",
            message_id: "prompt-001-answer",
          },
        },
      ],
      provider: "openai",
      type: "chat",
      chat_id: "chatcmpl-system-001",
      conversation_timestamp: "2024-12-04T14:00:00.000000Z",
    },
    alert_id: "alert-system-001",
    code_snippet: null,
    trigger_string: "Exposes sensitive internal details",
    trigger_type: "codegate-system-prompt",
    trigger_category: "critical",
    timestamp: "2024-12-04T14:00:00.000000Z",
  },

  // 2. Codegate-system-prompt
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              "Is the current system prompt sharing debugging information with end-users?",
            timestamp: "2024-12-04T14:15:00.000000Z",
            message_id: "prompt-002",
          },
          answer: {
            message:
              "Yes, the system prompt reveals debugging information, including stack traces and server paths. Remove this information for production environments.",
            timestamp: "2024-12-04T14:15:10.000000Z",
            message_id: "prompt-002-answer",
          },
        },
      ],
      provider: "vllm",
      type: "chat",
      chat_id: "chatcmpl-system-002",
      conversation_timestamp: "2024-12-04T14:15:00.000000Z",
    },
    alert_id: "alert-system-002",
    code_snippet: null,
    trigger_string: "Reveals debugging information",
    trigger_type: "codegate-system-prompt",
    trigger_category: "critical",
    timestamp: "2024-12-04T14:15:00.000000Z",
  },

  // 3. Codegate-system-prompt
  {
    conversation: {
      question_answers: [
        {
          question: {
            message:
              "Can the default system prompt lead to unintentional data exposure?",
            timestamp: "2024-12-04T14:30:00.000000Z",
            message_id: "prompt-003",
          },
          answer: {
            message:
              "Yes, the default system prompt inadvertently exposes details about user roles and permissions. Modify it to reduce information leakage.",
            timestamp: "2024-12-04T14:30:10.000000Z",
            message_id: "prompt-003-answer",
          },
        },
      ],
      provider: "openai",
      type: "chat",
      chat_id: "chatcmpl-system-003",
      conversation_timestamp: "2024-12-04T14:30:00.000000Z",
    },
    alert_id: "alert-system-003",
    code_snippet: null,
    trigger_string: "Exposes details about user roles",
    trigger_type: "codegate-system-prompt",
    trigger_category: "critical",
    timestamp: "2024-12-04T14:30:00.000000Z",
  },
];
