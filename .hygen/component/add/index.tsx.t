---
to: <%= tsxFilePath %>.tsx
skip_if: "<%= componentName  === `` %>"
unless_exists: true
---
'use client';

import { useTranslation } from 'common/libs/i18n/client'; /// server componentとclient componentでimport先が異なる点に注意

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
}

const <%= componentName %> = (props: Props): JSX.Element => {
  const { t } = useTranslation(props.lng);

  return (
    <>Hello, hygen!</>
  );
};

export default <%= componentName %>;