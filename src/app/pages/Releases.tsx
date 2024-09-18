import React, { useEffect, useState } from 'react';
import { useAppFunction } from '@dynatrace-sdk/react-hooks';
import { Button, Flex, ProgressCircle } from '@dynatrace/strato-components';
import { functions } from "@dynatrace-sdk/app-utils";
import { version } from 'os';
import { Page, TitleBar } from '@dynatrace/strato-components-preview';
import { SettingIcon } from '@dynatrace/strato-icons';


export const Releases = () => {

  const start = 280;
  const end = 302;
  const length = end - start + 1;
  const array = new Array(length);

  for (let i = 0; i < length; i++) {
    array[i] = start + i;
  }

  const [html, setHtml] = useState('')
  const [selectedVersion, setSelectedVersion] = useState('');

  const [isDetailViewDismissed, setIsDetailViewDismissed] =
    useState<boolean>(false);
  const [isSidebarDismissed, setIsSidebarDismissed] = useState<boolean>(false);

  const getReleases = async () => {
    const releases = await functions.call('get-releases', { data: selectedVersion });
    const text = await releases.text();
    setHtml(text);

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const navbar = doc.querySelector('nav'); // Adjust the selector to match your navbar
    if (navbar) {
      navbar.remove();
    }

    // Extract the body content
    const bodyContent = doc.body.innerHTML;
    setHtml(bodyContent);
  }



  // console.log(html);
  getReleases();


  const handleChange = (e) => {
    e.preventDefault();
    setSelectedVersion(e.target.innerText);
  };

  return (
    <Page>
      <Page.Sidebar resizable={false} minWidth={50} preferredWidth={'150px'}  dismissed={isSidebarDismissed}
        onDismissChange={(state) => setIsSidebarDismissed(state)}>
        <Flex flexDirection='column' alignContent='flex-start'>
          <TitleBar>
            <TitleBar.Title>
              Releases
            </TitleBar.Title>
          </TitleBar>
          {array.sort((a, b) => b - a).map((version) => (
            <Button key={version} onClick={handleChange} width={'100%'}>
              <div>{version}</div>
            </Button>
          ))}
        </Flex>
      </Page.Sidebar>
      <Page.Main>
      <TitleBar>
          <TitleBar.Prefix>
            <Page.PanelControlButton
              onClick={() => setIsSidebarDismissed(!isSidebarDismissed)}
            />
          </TitleBar.Prefix>
          <TitleBar.Title>Release Notes</TitleBar.Title>
          <TitleBar.Subtitle>
            {selectedVersion}
          </TitleBar.Subtitle>
        </TitleBar>
        {html == '' && <ProgressCircle />}
        <Flex paddingLeft={64} paddingRight={64} justifySelf='center' justifyContent='center' alignContent='center' alignItems='center' alignSelf='center'>
          {html !== '' && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </Flex>

      </Page.Main>
    </Page>
  );
};
