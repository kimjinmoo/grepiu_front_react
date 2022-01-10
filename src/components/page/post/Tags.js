import react, {useEffect, useState} from 'react';
import {fetchPostTags} from "../../../services/service";

const Tags = ({tags = []}) => {

  return <>
    All Tags
    {
      tags ? <>
        {
          tags.map(o=><div key={o.name}>{o.name}({o.count})</div>)
        }
      </> : <>Empty</>
    }
  </>
}

export default Tags;
