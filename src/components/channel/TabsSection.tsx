// TabsSection.tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';

const TabsSection: React.FC = () => {
  return (
    <Tabs defaultValue="dashboard">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard"> {/* Your Dashboard Content */} </TabsContent>
      <TabsContent value="videos"> {/* Your Video List Content */} </TabsContent>
      <TabsContent value="analytics"> {/* Your Analytics Content */} </TabsContent>
      <TabsContent value="settings"> {/* Your Settings Content */} </TabsContent>
    </Tabs>
  );
};

export default TabsSection;
