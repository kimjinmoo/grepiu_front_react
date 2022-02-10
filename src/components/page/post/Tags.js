const Tags = ({tags = [], currentTags, onClickHandler}) => {

  return <>
    <div className="mt-2"><a href="#" className="text-decoration-none" onClick={()=>onClickHandler({hashTags: ''})}>All Tags</a></div>
    <hr/>
    {
      tags ? <>
        {
          tags.map(o => <div key={o.name}><a href="#" className={`${currentTags === o.name?'bg-info':''} text-decoration-none`} onClick={() => onClickHandler({hashTags: o.name})}>{o.name}({o.count})</a></div>)
        }
      </> : <>Empty</>
    }
  </>
}

export default Tags;
