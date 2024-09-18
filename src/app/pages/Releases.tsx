import React, { useEffect, useState } from 'react';
import { Button, Flex, ProgressCircle } from '@dynatrace/strato-components';
import { functions } from "@dynatrace-sdk/app-utils";
import { Page, TitleBar } from '@dynatrace/strato-components-preview';
import { useLocation } from 'react-router';


export const Releases = () => {

  const start = 280;
  const end = 302;
  const length = end - start + 1;
  const array = new Array(length);

  for (let i = 0; i < length; i++) {
    array[i] = start + i;
  }
  
  const location = useLocation();
  const trimmed = location.pathname.toString().substring(1);

  const [html, setHtml] = useState('saas')
  const [selectedVersion, setSelectedVersion] = useState('300');
  const [type, setSelectedType] = useState(trimmed)
  const [versionList, setVersionList] = useState<number[]>([])

  const [isDetailViewDismissed, setIsDetailViewDismissed] =
    useState<boolean>(false);
  const [isSidebarDismissed, setIsSidebarDismissed] = useState<boolean>(false);

  const getReleases = async () => {

    let currentLocation = location.pathname.toString().substring(1);
    setSelectedType(currentLocation);

    if (location.pathname.toString() == "/"){
      currentLocation = "saas"
    }; 

    const releases = await functions.call('get-releases', { data: {type: currentLocation, version: selectedVersion} });
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

  useEffect(() => {
    getReleases();
  }, [selectedVersion, location])


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
          {array.filter(num => {
              if (trimmed == "oneagent" || trimmed == "activegate"){
                return num % 2 !== 0;
              }
              return num;
          }).sort((a, b) => b - a).map((version) => (
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
