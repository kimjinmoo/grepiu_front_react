import React, {useState} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import PostManagement from "./post/PostManagement";
import PostAdd from "./post/PostAdd";
import PostAddHashTags from "./post/PostAddHashTags";

const Admin = () => {
  const [key, setKey] = useState('post');

  return <>
    <Tabs activeKey={key}  onSelect={(k) => setKey(k)} id="admin-tab" className="mb-3">
      <Tab eventKey="post" title="포스팅 관리">
        <PostManagement tabKey={key}/>
      </Tab>
      <Tab eventKey="new-post" title="신규 포스팅 작성">
        <PostAdd/>
      </Tab>
      <Tab eventKey="post-hash" title="해시태그 관리">
        <PostAddHashTags/>
      </Tab>
      <Tab eventKey="member-adm" title="맴버관리">
        <>test3</>
      </Tab>
    </Tabs>
  </>
}

export default Admin;
