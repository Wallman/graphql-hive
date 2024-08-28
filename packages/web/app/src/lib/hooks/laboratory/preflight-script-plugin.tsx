import { ComponentProps, useCallback, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Subtitle, Title } from '@/components/ui/page';
import { Switch } from '@/components/ui/switch';
import { useToggle } from '@/lib/hooks';
import { GraphiQLPlugin, useStorageContext } from '@graphiql/react';
import { Editor as MonacoEditor, OnChange } from '@monaco-editor/react';
import { InfoCircledIcon, Pencil1Icon, TriangleRightIcon } from '@radix-ui/react-icons';

export const preflightScriptPlugin: GraphiQLPlugin = {
  icon: () => (
    <svg
      viewBox="0 0 256 256"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    >
      <path d="M136 160h40" />
      <path d="m80 96 40 32-40 32" />
      <rect width="192" height="160" x="32" y="48" rx="8.5" />
    </svg>
  ),
  title: 'Preflight Script',
  content: PreflightScriptContent,
};

const storageKey = {
  script: 'preflightScript:script',
  env: 'preflightScript:env',
  disabled: 'preflightScript:disabled',
};

const monacoOptions = {
  env: {
    minimap: { enabled: false },
    lineNumbers: 'off' as const,
    tabSize: 2,
  },
  console: {
    minimap: { enabled: false },
    lineNumbers: 'off',
    readOnly: true,
  },
  script: {
    minimap: { enabled: false },
  },
} satisfies Record<'script' | 'env' | 'console', ComponentProps<typeof MonacoEditor>['options']>;

function PreflightScriptContent() {
  const storage = useStorageContext({ nonNull: true });
  const [script, setScript] = useState(() => storage.get(storageKey.script) ?? '');
  const [env, setEnv] = useState(() => storage.get(storageKey.env) ?? '');
  const [showModal, toggleShowModal] = useToggle();
  const [enableScript, setEnableScript] = useState(
    () => storage.get(storageKey.disabled) !== 'false',
  );

  const handleScriptChange: OnChange = useCallback((newValue = '') => {
    setScript(newValue);
    storage.set(storageKey.script, newValue);
  }, []);

  const handleEnvChange: OnChange = useCallback((newValue = '') => {
    setEnv(newValue);
    storage.set(storageKey.env, newValue);
  }, []);

  const handleScriptDisabledChange = useCallback((checked: boolean) => {
    setEnableScript(checked);
    storage.set(storageKey.disabled, String(checked));
  }, []);

  return (
    <>
      <PreflightScriptModal
        isOpen={showModal}
        toggle={toggleShowModal}
        scriptValue={script}
        onScriptValueChange={handleScriptChange}
      />
      <div className="graphiql-doc-explorer-title flex items-center justify-between gap-4">
        Preflight Script
        <Button
          variant="orangeLink"
          size="icon-sm"
          className="size-auto gap-1"
          onClick={toggleShowModal}
        >
          <Pencil1Icon className="shrink-0" />
          Edit
        </Button>
      </div>
      <Subtitle>
        This script is run before each operation submitted, e.g. for automated authentication.
      </Subtitle>

      <div className="flex items-center gap-2 text-sm">
        <Switch
          checked={enableScript}
          onCheckedChange={handleScriptDisabledChange}
          className="my-4"
        />
        <span className="w-6">{enableScript ? 'ON' : 'OFF'}</span>
      </div>

      {enableScript && (
        <MonacoEditor
          height={128}
          className="*:rounded-md *:bg-[hsla(var(--color-neutral),var(--alpha-background-light))] *:py-3 *:opacity-70"
          defaultLanguage="javascript"
          value={script}
          onChange={handleScriptChange}
          theme="vs-dark"
          options={{
            ...monacoOptions.script,
            lineNumbers: 'off',
            readOnly: true,
          }}
        />
      )}

      <Title className="mt-6 flex gap-2">
        Environment variables{' '}
        <Badge className="text-xs" variant="outline">
          JSON
        </Badge>
      </Title>
      <Subtitle>Define variables to use in your Headers</Subtitle>
      <MonacoEditor
        height={128}
        className="*:rounded-md *:bg-[hsla(var(--color-neutral),var(--alpha-background-light))] *:py-3 *:opacity-70"
        defaultLanguage="json"
        value={env}
        onChange={handleEnvChange}
        theme="vs-dark"
        options={monacoOptions.env}
      />
    </>
  );
}

function PreflightScriptModal({
  isOpen,
  toggle,
  scriptValue,
  onScriptValueChange,
}: {
  isOpen: boolean;
  toggle: () => void;
  scriptValue: string;
  onScriptValueChange: OnChange;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className="w-11/12 !max-w-[unset] xl:w-4/5">
        <DialogHeader>
          <DialogTitle>Edit your Preflight Script</DialogTitle>
          <DialogDescription>
            This script will run in each user's browser and be stored in plain text on our servers.
            Don't share any secrets here 🤫.
            <br />
            All team members can view the script and toggle it off when they need to.
          </DialogDescription>
        </DialogHeader>
        <div className="grid h-[60vh] grid-cols-2 [&_section]:grow">
          <div className="flex flex-col">
            <div className="flex justify-between p-2">
              <Title className="flex gap-2">
                Script Editor
                <Badge className="text-xs" variant="outline">
                  JavaScript
                </Badge>
              </Title>
              <Button variant="orangeLink" size="icon-sm" className="size-auto">
                <TriangleRightIcon className="shrink-0" /> Run Script
              </Button>
            </div>
            <MonacoEditor
              className="*:bg-[rgba(183,194,215,.07)] *:py-3"
              defaultLanguage="javascript"
              value={scriptValue}
              onChange={onScriptValueChange}
              theme="vs-dark"
              options={monacoOptions.script}
            />
          </div>
          <div className="flex flex-col">
            <Title className="p-2">Console output</Title>
            <MonacoEditor
              className="*:bg-[rgba(183,194,215,.07)] *:py-3"
              defaultLanguage="javascript"
              theme="vs-dark"
              options={monacoOptions.console}
            />
            <Title className="flex gap-2 p-2">
              Environment Variables
              <Badge className="text-xs" variant="outline">
                JSON
              </Badge>
            </Title>
            <MonacoEditor
              className="*:bg-[rgba(183,194,215,.07)] *:py-3"
              defaultLanguage="json"
              // value={value}
              // onChange={(newValue = '') => setValue(newValue)}
              theme="vs-dark"
              options={monacoOptions.env}
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          <p className="me-5 flex items-center gap-2 text-sm">
            <InfoCircledIcon />
            Changes made to this Preflight Script will apply to all users on your team using this
            variant.
          </p>
          <Button type="button">Close</Button>
          <Button type="button" variant="primary">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
