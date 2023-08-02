import ReactAudioPlayer from "react-audio-player";
import {readBlobCloud} from "../../../../services/service";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Rename from "../utils/Rename";

const Wrapper = styled.div`
  .audioPlay {
     height: 100vh; 
     display: flex;
     justify-content: center;
     align-items: center;
  }
`;

const AudioReader = ({
  id
}) => {
  const [audio, setAudio] = useState(null);

  const fetchFile = () => {
    readBlobCloud(id).then(res => {
      setAudio(URL.createObjectURL(res));
    })
  }
  useEffect(() => {
    fetchFile();
  }, [id])

  return <Wrapper>
    <Rename/>
    <div className='audioPlay'>
      <ReactAudioPlayer
          src={audio}
          autoPlay={false}
          controls
      />
    </div>
  </Wrapper>
}

export default AudioReader;
